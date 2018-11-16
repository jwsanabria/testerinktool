import React, { Component } from 'react';
import axios from 'axios';
import Aplicacion from './Aplicacion';

class Aplicaciones extends Component {
    state = { 
        aplicaciones : []
     }

    componentDidMount(){
        this.obtenerAplicaciones();
    }


    obtenerAplicaciones = () => {
        axios.get(`https://testerink-api.herokuapp.com/api/apps`).then(res => {
            this.setState({
                aplicaciones: res.data.data
            })
        })
    }

    eliminarApp = (id) => {
        axios.delete(`https://testerink-api.herokuapp.com/api/apps/${id}`).then(res => {
            if(res.status === 200){
                this.obtenerAplicaciones();
            }
        })

        
    }

    mostrarAplicaciones = () => {
        
        if(this.state.aplicaciones.length === 0) return null;
        return(
            <React.Fragment>
                {Object.keys(this.state.aplicaciones).map(app=>(
                    <Aplicacion 
                        key={app}
                        info={this.state.aplicaciones[app]}
                        eliminarApp={this.eliminarApp}/>
                ))}
            </React.Fragment>
        );
    }

    render() { 
        return (
            <div className="row">
                <div className="col-lg-12">
                    <h2 className="page-header">Aplicaciones</h2>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-heading clearfix">
                                <h3 className="panel-title pull-left">Listado</h3>
                                <div className="btn-group pull-right">
                                    <a href="/conf/nuevaApp" className="btn btn-primary btn-sm">Nueva App</a>
                                </div>
                            </div>
                            <div className="panel-body scroll">
                                <table className="table table-striped table-bordered table-hover" id="dataTable">
                                    <thead>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Tipo</th>
                                            <th>Aplicación</th>
                                            <th>URL / Recurso</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {this.mostrarAplicaciones()}
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
 
export default Aplicaciones;
