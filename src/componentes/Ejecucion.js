import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Ejecucion extends Component {
    state = {  }
    render() { 
        const {_id, aplicacion, setPrueba, create_date, estado} = this.props.info;
        let nombre=null;

        this.props.apps.forEach(app => {
            if(app._id===aplicacion){
                nombre = app.nombre + " - " + app.tipo;
            }
        });
        
       
        return ( 
            <tr>
                <td>{(new Date(create_date)).toLocaleDateString()}</td>
                <td>{setPrueba}</td>
                <td>{nombre}</td>
                <td>{estado}</td>
                <td>
                    <Link to={`/resultadoPruebas/${_id}`} className="btn btn-success">Resultados</Link>
                </td>
            </tr>
         );
    }
}
 
export default Ejecucion;