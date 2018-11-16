import React, { Component } from 'react';


class SetPrueba extends Component {
    state = {  }
    render() { 
        const {_id, aplicacion, arrayPruebas} = this.props.info;
        let nombre=null;
        console.log("Apps: " + this.props.apps);
        this.props.apps.forEach(app => {
            if(app._id==aplicacion){
                nombre = app.nombre + " - " + app.tipo;
            }
        });
        
       
        return ( 
            <tr>
                <td>{_id}</td>
                <td>{nombre}</td>
                <td>
                    <button onClick={() => this.props.ejecutarSetPrueba(this.props.info)} type="button" className="btn btn-primary btn-space">Ejecutar</button>
                    <button onClick={() => this.props.programarSetPrueba()} type="button" className="btn btn-success btn-space">Programar</button>
                    <button onClick={() => this.props.eliminarSetPrueba(_id)} type="button" className="btn btn-danger btn-space">Eliminar</button>
                </td>
            </tr>
         );
    }
}
 
export default SetPrueba;