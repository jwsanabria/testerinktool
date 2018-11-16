import React, { Component } from 'react';
import { Inicial, TipoPrueba, WebForm, MovilForm, MovilDetail, Confirm } from './Steps.js';
import { states } from './States';
import { StateMachine } from './StateMachine';
import axios from 'axios';
import swal from 'sweetalert2';
import uuid from 'uuid';

class Prueba extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentState: states.INICIAL,
            aplicaciones: [],
            opcionesApps: [],
            aplicacion: null,
            tipoAplicacion: null,
            vehicleType: null,
            pruebas: [],
            registrado: true
        };
        this._next = this._next.bind(this);
        this._back = this._back.bind(this);
        this.guardarPrueba = this.guardarPrueba.bind(this);
        this.stateMachine = new StateMachine();
    }

    componentDidMount() {
        this.obtenerAplicaciones();
    }

    asignarAplicacion = (app) => {
        this.setState({
            aplicacion: app
        })
    }

    asignarTipoAplicacion = (tipoApp) => {
        this.setState({
            tipoAplicacion: tipoApp
        })
    }

    obtenerAplicaciones = () => {
        axios.get(`https://testerink-api.herokuapp.com/api/apps`).then(res => {
            if (res.status === 200) {
                console.log("SERVICIO CONSULTA APPS ");
                console.log(!res.data.data);
                let opcionesApps = [];
                if (res.data.data) {
                    console.log("Hay DATA");
                    res.data.data.map((i) => {
                        console.log("ALGO");
                        return (
                            opcionesApps.push({ 'key': i._id, 'value': i._id, 'text': i.nombre.concat(" - ").concat(i.tipo) })
                        )
                    });
                }
                console.log(opcionesApps);

                this.setState({
                    aplicaciones: res.data.data,
                    opcionesApps: opcionesApps
                })
            }
        });
    }

    registrarSetPrueba = () => {
        let arrayPruebas = [];
        this.state.pruebas.map((i) => {
            const { tipoPrueba, nombrePrueba, archivo } = i;
            const idPrueba = uuid();
            
            const data = new FormData();
            const nombreArchivo=idPrueba+"-"+archivo.name;
            data.append('file', archivo);
            data.append('filename', nombreArchivo);

            axios.post('https://testerink-api.herokuapp.com/api/upload', data).then(function (response) {
                this.setState({ imageURL: `https://testerink-api.herokuapp.com/${data.filename}`, uploadStatus: true });
            }).catch(function (error) {
                console.log(error);
            });

            const prueba = {
                idPrueba,
                nombrePrueba,
                tipoPrueba,
                script: "https://s3-us-west-2.amazonaws.com/testerink-tool-bucket/" + nombreArchivo,
            }
            arrayPruebas.push(prueba);
        });

        const setPrueba = {
            aplicacion : this.state.aplicacion,
            arrayPruebas
        }

        // registrar el set de pruebas en el api
        axios.post('https://testerink-api.herokuapp.com/api/setPruebas', setPrueba).then(function (response) {
            if (response.status === 200) {
                swal(
                    "Creación Exitosa!",
                    "El set de prueba fue creado correctamente",
                    "success"
                )
            }
        }).catch(function (error) {
            console.log(error);
        });

        this.setState({
            registrado: false
        })
    }

    guardarPrueba(prueba) {
        let pruebas = this.state.pruebas.concat();
        pruebas.push(prueba);
        this.setState({
            pruebas: pruebas
        });
    }

    _next(desiredState) {
        let currentState = this.state.currentState;
        let nextState = this.stateMachine.transitionTo(currentState, desiredState);
        this.setState({
            currentState: nextState
        });
    }

    _back(desiredState) {
        let currentState = this.state.currentState;
        this.setState({
            currentState: this.stateMachine.transitionFrom(currentState, desiredState)
        });
    }



    /*
     * Just a note -- you'll see the _next and _back functions
     * get passed around to child components alot. This is not
     * a very good practice, and in the real-world it would be
     * better to use a library like redux to handle application
     * state.
     */
    _currentStep() {
        switch (this.state.currentState) {
            case states.INICIAL:
                return (<Inicial aplicaciones={this.state.aplicaciones} opcionesApps={this.state.opcionesApps} asignarTipoAplicacion={this.asignarTipoAplicacion} next={this._next} back={this._back} asignarAplicacion={this.asignarAplicacion} />);
            case states.TIPO_PRUEBA:
                return (<TipoPrueba aplicacion={this.state.aplicacion} aplicaciones={this.state.aplicaciones}
                    back={this._back}
                    next={this._next} />);
            case states.WEB:
                return (<WebForm
                    saveForm={this.guardarPrueba}
                    back={this._back}
                    next={this._next} />);
            case states.MOVIL:
                return (<MovilForm
                    saveForm={this.guardarPrueba}
                    back={this._back}
                    next={this._next} />);
            case states.MOVIL_DETAIL:
                return (<MovilDetail
                    back={this._back}
                    next={this._next} />);
            case states.CONFIRM:
                return (<Confirm tipoAplicacion={this.state.tipoAplicacion} registrarSetPrueba={this.registrarSetPrueba} registrado={this.state.registrado}
                    pruebas={this.state.pruebas}
                    back={this._back}
                    next={this._next} />);
            default:
                return (<Inicial aplicaciones={this.state.aplicaciones} opcionesApps={this.state.opcionesApps} next={this._next} back={this._back} />);
        }
    }
    render() {
        return (
            <div className="row">
                <div class="col-lg-12">
                    <h2 class="page-header">Set de Prueba</h2>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        {this._currentStep()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Prueba;