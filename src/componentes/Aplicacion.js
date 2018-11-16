import * as React from 'react';
import {Link} from 'react-router-dom';

class Aplicacion extends React.Component {
    
    render() { 
        const {_id, create_date, nombre, tipo, url_pruebas, url_github, url_apk} = this.props.info;
       
        return ( 
            <tr>
                <td>{(new Date(create_date)).toLocaleDateString()}</td>
                <td>{tipo}</td>
                <td>{nombre}</td>
                <td>{url_pruebas}</td>
                <td>
                    <Link to={`/conf/editarApp/${_id}`} className="btn btn-primary">Editar</Link>
                    <button onClick={() => this.props.eliminarApp(_id)} type="button" className="btn btn-danger">Eliminar</button>
                </td>
            </tr>
         );
    }
}
 
export default Aplicacion;