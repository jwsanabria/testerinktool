import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Aplicaciones from './Aplicaciones';
import CrearAplicacion from './CrearAplicacion';
import EditarAplicacion from './EditarAplicacion';
import swal from 'sweetalert2';
import Prueba from './Prueba';
import Ejecuciones from './Ejecuciones';
import Resultados from './Resultados';
import ResultadosPruebas from './ResultadosPruebas';
import Inicio from './Inicio';

class Router extends Component {
    state = {
        aplicaciones: [],
        aplicacion: Object,
    }

    componentDidMount() {
        this.obtenerPost();
    }

    obtenerPost = () => {
        axios.get(`https://jsonplaceholder.typicode.com/posts`).then(res => {
            this.setState({
                posts: res.data
            })
        })
    }

    crearAplicacion = (app) => {
        axios.post(`https://testerink-api.herokuapp.com/api/apps`, app).then(res => {
            if (res.status === 200) {
                swal(
                    "Creación Exitosa!",
                    "La aplicación " + app.nombre + " fue creada correctamente",
                    "success"
                )
            }
        })
    }

    editarAplicacion = (app) => {
        axios.put(`https://testerink-api.herokuapp.com/api/apps/${app._id}`, app).then(res => {
            if (res.status === 200) {
                swal(
                    "Actualización Exitosa!",
                    "La aplicación " + app.nombre + " fue actualizada",
                    "success"
                );
            } else {
                console.log(res);
            }
        })
    }



    render() {
        return (
            <BrowserRouter >


                <Switch>
                    <Route exact path='/' render={() => {
                        return (
                            <div id="page-wrapper" className="bgimg">
                                <Inicio />
                            </div>
                        )
                    }}
                    />

                    <Route exact path='/conf/apps' render={() => {
                        return (
                            <div id="page-wrapper">
                                <Aplicaciones />
                            </div>
                        )
                    }}
                    />

                    <Route exact path='/conf/nuevaApp' render={() => {
                        return (
                            <div id="page-wrapper">
                                <CrearAplicacion crearAplicacion={this.crearAplicacion} />
                            </div>
                        )
                    }}
                    />

                    <Route exact path='/conf/editarApp/:appId' render={(props) => {
                        let idApp = props.location.pathname.replace('/conf/editarApp/', '');

                        return (
                            <div id="page-wrapper">
                                <EditarAplicacion idApp={idApp} editarAplicacion={this.editarAplicacion} />
                            </div>
                        )
                    }}
                    />

                    <Route exact path='/nuevaPrueba' render={(props) => {

                        return (
                            <div id="page-wrapper">
                                <Prueba />
                            </div>
                        )
                    }}
                    />

                    <Route exact path='/ejecuciones' render={(props) => {

                        return (
                            <div id="page-wrapper">
                                <Ejecuciones />
                            </div>
                        )
                    }}
                    />

                    <Route exact path='/resultados' render={(props) => {

                        return (
                            <div id="page-wrapper">
                                <Resultados />
                            </div>
                        )
                    }}
                    />

                    <Route exact path='/resultadoPruebas/:idEjecucion' render={(props) => {
                        let idEjecucion = props.location.pathname.replace('/resultadoPruebas/', '');

                        /*let filtro = posts.filter(post => (
                            post.id == idPost
                        ));*/
                        return (
                            <div id="page-wrapper">
                                <ResultadosPruebas idEjecucion={idEjecucion} />
                            </div>
                        )
                    }}
                    />

                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;