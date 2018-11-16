import React, { Component } from 'react';
import Ejecucion from './Ejecucion';
import axios from 'axios';
import swal from 'sweetalert2';

class Resultados extends Component {
    state = { 
        aplicaciones: [],
        setPruebas : [],
        ejecuciones : []
     }

    componentDidMount(){
        this.obtenerAplicaciones();
        this.obtenerSetPruebas();
        this.obtenerEjecuciones();
    }


    obtenerAplicaciones = () => {
        axios.get(`https://testerink-api.herokuapp.com/api/apps`).then(res => {
            this.setState({
                aplicaciones: res.data.data
            })
        })
    }


    obtenerSetPruebas = () => {
        axios.get(`https://testerink-api.herokuapp.com/api/setPruebas`).then(res => {
            this.setState({
                setPruebas: res.data.data
            })
        })
    }


    obtenerEjecuciones = () => {
        axios.get(`https://testerink-api.herokuapp.com/api/ejecucion`).then(res => {
            this.setState({
                ejecuciones: res.data.data
            })
        })
    }

    verEjecucion = () => {
        swal({
            type: 'error',
            title: 'Ooops!',
            text: 'La funcionalidad aún no esta implementada!',
        })
    }

    mostrarEjecuciones = () => {
        
        if(this.state.ejecuciones.length === 0) return null;
        return(
            <React.Fragment>
                {Object.keys(this.state.ejecuciones).map(ejecucion=>(
                    
                    <Ejecucion 
                        key={ejecucion}
                        info={this.state.ejecuciones[ejecucion]}
                        apps={this.state.aplicaciones}
                        setPruebas={this.state.setPruebas}
                        verEjecucion={this.verEjecucion}
                         />
                ))}
            </React.Fragment>
        );
    }


    render() { 
        return (
            <div className="row">
                <div className="col-lg-12">
                    <h2 className="page-header">Resultados</h2>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-heading clearfix">
                                <h3 className="panel-title pull-left">Listado</h3>
                            </div>
                            <div className="panel-body scroll">
                                <table className="table table-striped table-bordered table-hover" id="dataTable">
                                    <thead>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Set de Pruebas</th>
                                            <th>Aplicación</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.mostrarEjecuciones()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        );
    }
}
 
export default Resultados;