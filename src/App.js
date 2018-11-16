import React, { Component } from 'react';
import './App.css';
import Router from './componentes/Router';


class App extends Component {


    render() {
        return (

            <div id="wrapper">

                <nav className="navbar navbar-default navbar-static-top margin0" role="navigation">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand align-top" href="/">
                            Testerink-tool
                </a>
                    </div>

                    <ul className="nav navbar-top-links navbar-right">
                        <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                                <i className="fa fa-envelope fa-fw"></i> <i className="fa fa-caret-down"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-messages">
                                <li>
                                    <a href="#">
                                        <div>
                                            <strong>Usuario</strong>
                                            <span className="pull-right text-muted">
                                                <em>Ayer</em>
                                            </span>
                                        </div>
                                        <div>Revisión de pruebas</div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a className="text-center" href="#">
                                        <strong>Leer Todo</strong>
                                        <i className="fa fa-angle-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                                <i className="fa fa-bell fa-fw"></i> <i className="fa fa-caret-down"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-alerts">
                                <li>
                                    <a href="#">
                                        <div>
                                            <i className="fa fa-tasks fa-fw"></i> New Task
                                    <span className="pull-right text-muted small">4 minutes ago</span>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="#">
                                        <div>
                                            <i className="fa fa-upload fa-fw"></i> Server Rebooted
                                    <span className="pull-right text-muted small">4 minutes ago</span>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a className="text-center" href="#">
                                        <strong>Ver Todas las Alertas</strong>
                                        <i className="fa fa-angle-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <div className="navbar-default sidebar" role="navigation">
                        <div className="sidebar-nav navbar-collapse">
                            <ul className="nav" id="side-menu">
                                <li>
                                    <a href="/nuevaPrueba"><i className="fa fa-fw fa-file"></i>Nueva Prueba</a>
                                </li>
                                <li>
                                    <a href="/ejecuciones"><i className="fa fa-fw fa-dashboard"></i>Ejecución de Pruebas</a>
                                </li>
                                <li>
                                    <a href="/resultados"><i className="fa fa-fw fa-area-chart"></i>Resultados de Ejecuciones</a>
                                </li>
                                <li>
                                    <a href="#"><i className="fa fa-wrench fa-fw"></i>Configuración<span className="fa arrow"></span></a>
                                    <ul className="nav nav-second-level" id="apps">
                                        <li>
                                            <a href="/conf/apps">Aplicaciones</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>

                </nav>
                <Router/>
            </div>



        );
    }
}

export default App;
