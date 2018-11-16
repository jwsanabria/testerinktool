import React, { Component } from 'react';

class Inicio extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="row">
                <h1>TesterInk-Tool</h1>
                <hr/>
                <p>Herramienta de pruebas elaborada para el curso de Pruebas Automáticas - MISO4208</p>
                <hr/>
                <h2>Integrantes - Grupo 03</h2>
                <ul>
                    <li>William Ravelo</li>
                    <li>William Sanabria</li>
                </ul>

            </div>
         );
    }
}
 
export default Inicio;