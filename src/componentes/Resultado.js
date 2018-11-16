import React, { Component } from 'react';

class Resultado extends Component {
    state = {  }
    render() { 
        const {_id, ejecucion, idPrueba, nombrePrueba, tipoPrueba, estado, create_date, resultados} = this.props.info;
        
       
        return ( 
            <tr>
                <td>{(new Date(create_date)).toLocaleDateString()}</td>
                <td>{nombrePrueba}</td>
                <td>{tipoPrueba}</td>
                <td>{estado}</td>
                <td>
                    <button onClick={() => this.props.verEjecucion(ejecucion)} type="button" className="btn btn-primary btn-space">Ver Ejecución</button>
                    <a href={`${resultados}`} target="_blank"  className="btn btn-success btn-space">Reporte</a>
                </td>
            </tr>
         );
    }
}
 
export default Resultado;