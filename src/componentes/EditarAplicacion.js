import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


class EditarAplicacion extends Component {

    state={
        app:Object,
        redirectPage:false
    }

    // crear los refs
    tipoAppRef = React.createRef();
    nombreAppRef = React.createRef();
    urlAppRef = React.createRef();
    urlAppGithubRef = React.createRef();
    urlAppApkRef = React.createRef();

    componentDidMount(){
        this.obtenerApp(this.props.idApp);
    }

    editarApp = (e) =>{
        e.preventDefault();
        
        const app = {
            nombre : this.nombreAppRef.current.value,
            tipo : this.tipoAppRef.current.value,
            url_pruebas: this.urlAppRef.current.value,
            url_github : this.urlAppGithubRef.current.value,
            url_apk : this.urlAppApkRef.current.value,
            _id :  this.props.idApp
        }

        this.props.editarAplicacion(app);

        this.setState({
            app : app,
            redirectPage : true
        })
    }

    obtenerApp=(id)=>{
        axios.get(`https://testerink-api.herokuapp.com/api/apps/${id}`).then(res => {
            if(res.status === 200){
                this.setState({
                    app : res.data.data
                })
            }
            
        })
    }

    

    mostrarFormulario = () => {
        
        if(!this.state.app) return null;

        const {_id, create_date, nombre, tipo, url_pruebas, url_github, url_apk} = this.state.app;

        return (
            

            <div className="row">
                <div className="col-lg-12">
                    <h4 className="page-header">Editar Aplicación</h4>
                </div>
                <div className="col">
                    <form onSubmit={this.editarApp}>
                        <div className="form-group">
                            <label htmlFor="tipoAplicacion">Tipo:</label>
                            <input type="text" className="form-control" id="tipoAplicacion" ref={this.tipoAppRef} defaultValue={tipo}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nombreAplicacion">Nombre:</label>
                            <input type="text" className="form-control" id="nombreAplicacion" ref={this.nombreAppRef} defaultValue={nombre}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="urlAplicacion">URL (pruebas):</label>
                            <input type="text" className="form-control" id="urlAplicacion" ref={this.urlAppRef} defaultValue={url_pruebas}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="urlAppGithub">URL GitHub:</label>
                            <input type="text" className="form-control" id="urlAppGithub" ref={this.urlAppGithubRef} defaultValue={url_github}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="urlAppApk">URL APK:</label>
                            <input type="text" className="form-control" id="urlAppApk" ref={this.urlAppApkRef} defaultValue={url_apk}/>
                        </div>

                        <button className="btn btn-primary" id="enviar" type="submit">Guardar</button>
                        <Link to={`/conf/apps/`} className="btn btn-danger">Cancelar</Link>
                    </form>
                </div>
            </div>
        );
    }
    
    render() { 
        return ( 
            <React.Fragment>
                {this.mostrarFormulario()}
            </React.Fragment>
         );
    }
}
 
export default EditarAplicacion;
