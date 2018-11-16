import React, { Component } from 'react';
import axios from 'axios';
import Resultado from './Resultado';
import swal from 'sweetalert2';

class ResultadosPruebas extends Component {
    state = { 
        idEjecucion: null,
        resultados: []
    }

    componentDidMount(){
        this.obtenerResultado();
    }

    obtenerResultado = () => {
        axios.get(`https://testerink-api.herokuapp.com/api/resultado/?ejecucion=${this.props.idEjecucion}`).then(res => {
            if(res.status === 200){
                this.setState({
                    resultados: res.data.data
                });
            }
        })
    }

    cargarResultados = () => {
        if(this.state.resultados.length === 0) return null;
        return(
            <React.Fragment>
                {Object.keys(this.state.resultados).map(resultado=>(
                    
                    <Resultado 
                        key={resultado}
                        info={this.state.resultados[resultado]}
                        verEjecucion={this.verEjecucion}
                         />
                ))}
            </React.Fragment>
        );
    }


    verEjecucion = (ejecucion) =>{
        swal({
            type: 'error',
            title: 'Ooops!',
            text: 'La funcionalidad aún no esta implementada!',
        })
    }

    render() { 
        return (
            <div className="row">
                <div className="col-lg-12">
                    <h2 className="page-header">Resultados de Ejecución</h2>
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
                                            <th>Prueba</th>
                                            <th>Tipo</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.cargarResultados()}
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
 
export default ResultadosPruebas;