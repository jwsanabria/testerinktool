import React, { Component } from 'react';
import { Form, Button, Grid, Message, List} from 'semantic-ui-react';
import { states } from './States.js';

export class Inicial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aplicacion: null,
            aplicaciones: [],
            opcionesApps: [],
            errors: []
        };
        this._onChange = this._onChange.bind(this);
        this._validate = this._validate.bind(this);
    }

    componentDidMount() {

        let opcionesApps = [];

        this.props.aplicaciones.map((i) => {
            return (
                opcionesApps.push({ 'key': i._id, 'value': i.i_id, 'text': i.nombre })
            )
        });

        this.setState({
            opcionesApps: opcionesApps
        })
    }

    _onChange(e, { name, value }) {
        this.setState({
            [name]: value
        });

        this.props.asignarAplicacion(value);
    }

    _validate(e) {
        e.preventDefault();
        let idAplicacion = this.state.aplicacion;
        if (idAplicacion !== '' && idAplicacion !== undefined) {
            let aplicacion = this.props.aplicaciones.filter(app => (
                app._id === idAplicacion
            ));

            if (aplicacion && aplicacion.length > 0) {
                this.props.asignarTipoAplicacion(aplicacion[0].tipo);
                if (aplicacion[0].tipo === 'Web') {
                    this.props.next(states.WEB);
                } else {
                    this.props.next(states.MOVIL);
                }
            } else {
                this.setState({
                    errors: ['No es posible direccionar la solicitud']
                })
            }

        } else {
            this.setState({
                errors: ['Seleccione una aplicación']
            });
        }
    }

    render() {
        console.log(this.props.opcionesApps);
        return (
            <div class="col-lg-6">
                <p>El set de pruebas esta compuesto por una aplicación y el registro de una o varias pruebas.</p>
                <Form>
                    {this.state.errors.length > 0 &&
                        <Message negative>
                            <p>{this.state.errors.join('. ')}</p>
                        </Message>
                    }
                    <Form.Group widths='equal' class="form-group">

                        <Form.Dropdown
                            name='aplicacion'
                            clearable selection
                            value={this.state.aplicacion}
                            onChange={this._onChange}
                            label='Aplicación'
                            placeholder='Aplicación'
                            options={this.props.opcionesApps}>

                        </Form.Dropdown>
                    </Form.Group>
                    <Grid>
                        <Grid.Column floated='left' width={5}>

                        </Grid.Column>
                        <Grid.Column floated='right' width={5}>
                            <Button primary onClick={this._validate}>Siguiente</Button>
                        </Grid.Column>
                    </Grid>
                </Form>
            </div>
        );
    }

}

export class TipoPrueba extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            errors: []
        };
        this._onChange = this._onChange.bind(this);
        this._validate = this._validate.bind(this);
        this._back = this._back.bind(this);
    }

    _onChange(e, { value }) {
        this.setState({
            value: value,
            errors: []
        });
    }

    _validate(e) {
        e.preventDefault();
        let value = this.state.value;
        if (value === 'web') {
            this.props.next(states.WEB);
        } else if (value === 'movil') {
            this.props.next(states.MOVIL);
        } else {
            this.setState({
                errors: ['Por favor seleccione un tipo de prueba']
            });
        }
    }

    _back() {
        this.props.back(states.INICIAL)
    }

    render() {
        console.log(this.props.aplicacion);
        return (

            <div class="col-lg-6">
                <Form>

                    {this.state.errors.length > 0 &&
                        <Message negative>
                            <p>{this.state.errors.join('. ')}</p>
                        </Message>
                    }
                    <Form.Field>
                        <label>Seleccione el tipo de aplicación:</label>
                        <Form.Radio
                            label='Movil'
                            value='movil'
                            checked={this.state.value === 'movil'}
                            onChange={this._onChange} />
                        <Form.Radio
                            label='Web'
                            value='web'
                            checked={this.state.value === 'web'}
                            onChange={this._onChange} />
                    </Form.Field>
                    <Grid>
                        <Grid.Column floated='left' width={5}>
                            <Button secondary onClick={this._back}>Anterior</Button>
                        </Grid.Column>
                        <Grid.Column floated='right' width={5}>
                            <Button primary onClick={this._validate}>Siguiente</Button>
                        </Grid.Column>
                    </Grid>
                </Form>
            </div>
        );
    }
}

class BaseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
            make: null,
            model: null,
            value: null,
            length: null,
            tipoPrueba: null,
            nombrePrueba: null,
            archivo: [],
            tiposPrueba: [],
            errors: []
        }
        this._onChange = this._onChange.bind(this);
        this._validate = this._validate.bind(this);
        this._back = this._back.bind(this);
    }

    componentDidMount() {
        let tiposPrueba = null;
        if (this.props.type === 'Web') {
            tiposPrueba = [
                { text: 'End To End', value: 'e2e' },
                { text: 'Headless', value: 'headless' },
                { text: 'Behavior Driven Testing', value: 'bdt' },
                { text: 'Random Testing', value: 'random' },
                { text: 'Visual Reggresion Testing', value: 'vrt' },
                { text: 'Generation Data', value: 'gdata' },
                { text: 'Mutation Testing', value: 'mutation' }
            ];
        } else if (this.props.type === 'Movil') {
            tiposPrueba = [
                { text: 'Behavior Driven Testing', value: 'bdt' },
                { text: 'Random Testing', value: 'random' },
                { text: 'Generation Data', value: 'gdata' },
                { text: 'Mutation Testing', value: 'mutation' }
            ];
        } else {
            tiposPrueba = [];
        }

        this.setState({
            tiposPrueba: tiposPrueba
        })
    }

    _back(e) {
        e.preventDefault();
        this.props.back(states.TIPO_PRUEBA);
    }

    _onChange(e, { name, value }) {
        this.setState({
            [name]: value
        });
    }

    handleFileUpload = (event) => {
        console.log("EVENT FILE");
        console.log(event.target);
        this.setState({ archivo: event.target.files[0] });
    }

    _validate(e) {
        e.preventDefault();
        // You can add your validation logic here

        this.props.saveForm({
            type: this.props.type,
            make: this.state.make,
            tipoPrueba: this.state.tipoPrueba,
            nombrePrueba: this.state.nombrePrueba,
            archivo: this.state.archivo
        });

        this.props.next(this.props.nextState);
    }

    render() {

        return (
            <div class="col-lg-6">
                <Form>
                    {this.state.errors.length > 0 &&
                        <Message negative>
                            <p>{this.state.errors.join('. ')}</p>
                        </Message>
                    }
                    <h3>Registro de prueba {this.props.type}</h3>
                    <Form.Group widths='equal'>
                        <Form.Input
                            name='nombrePrueba'
                            value={this.state.nombrePrueba}
                            onChange={this._onChange}
                            label='Nombre Prueba'
                            placeholder='Descripción corta' />
                        <Form.Dropdown
                            name='tipoPrueba'
                            clearable selection
                            value={this.state.tipoPrueba}
                            onChange={this._onChange}
                            label='Tipo Prueba'
                            placeholder='Seleccione ...'
                            options={this.state.tiposPrueba} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input
                            name='file'
                            ref={(ref) => { this.uploadInput = ref; }}
                            onChange={this.handleFileUpload}
                            label='Archivo'
                            type='file'
                            placeholder='Archivo' />


                    </Form.Group>
                    <Grid>
                        <Grid.Column floated='left' width={5}>
                            <Button secondary onClick={this._back}>Anterior</Button>
                        </Grid.Column>
                        <Grid.Column floated='right' width={5}>
                            <Button primary onClick={this._validate}>Siguiente</Button>
                        </Grid.Column>
                    </Grid>
                </Form>
            </div>
        );
    }
}

export const MovilForm = (props) => {
    return (
        <BaseForm
            type='Movil'
            next={props.next}
            back={props.back}
            saveForm={props.saveForm}
            nextState={states.MOVIL_DETAIL} />
    );
}

export const WebForm = (props) => {
    return (
        <BaseForm
            type='Web'
            next={props.next}
            back={props.back}
            saveForm={props.saveForm}
            nextState={states.CONFIRM} />
    );
}

export class MovilDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this._onChange = this._onChange.bind(this);
        this._validate = this._validate.bind(this);
    }
    _onChange(e) {

    }

    _validate(e) {
        // You can add validation logic here
        this.props.next(states.CONFIRM)
    }

    render() {
        let options = [
            {
                text: 'Yes',
                value: 'Yes'
            },
            {
                text: 'No',
                value: 'No'
            },
            {
                text: "Don't Know",
                value: "Don't Know"
            }
        ];

        return (
            <div class="col-lg-6">
                <Form>
                    <h2>Boat History</h2>
                    <Form.Field>
                        <label>Has your boat been involved with piracy in the past 12 months?</label>
                        <Form.Dropdown placeholder='Select Answer' options={options} />
                    </Form.Field>
                    <Grid>
                        <Grid.Column floated='left' width={5}>
                            <Button secondary onClick={() => this.props.back(states.BOAT)}>Back</Button>
                        </Grid.Column>
                        <Grid.Column floated='right' width={5}>
                            <Button primary onClick={this._validate}>Next</Button>
                        </Grid.Column>
                    </Grid>
                </Form>
            </div>
        );
    }
}

export class Confirm extends React.Component {
    render() {
        /*
         * Here is our final step. In the real world, we would
         * obviously do something more complicated than a javascript
         * alert
         */
        return (
            <div class="col-lg-6">

                <h3>Pruebas registradas:</h3>
                <List relaxed='very'>
                    {this.props.pruebas.map((i) => {
                        return (
                            <List.Item key={i.nombrePrueba}>
                                <List.Icon name='tasks' size='large' verticalAlign='middle' />
                                <List.Content>
                                    <List.Header>{i.nombrePrueba}</List.Header>
                                    <List.Description as='a'>{i.tipoPrueba}</List.Description>
                                </List.Content>
                            </List.Item>
                        );
                    })}
                </List>
                {this.props.registrado > 0 &&
                    <Grid>


                        <Grid.Column floated='left' width={5}>
                            {this.props.tipoAplicacion === 'Web' &&
                                <Button onClick={() => this.props.next(states.WEB)}>Agregar</Button>
                            }
                            {this.props.tipoAplicacion === 'Movil' &&
                                <Button onClick={() => this.props.next(states.MOVIL)}>Agregar</Button>
                            }
                        </Grid.Column>
                        <Grid.Column floated='right' width={5}>
                            <Button primary onClick={() => this.props.registrarSetPrueba()}>Registrar</Button>
                        </Grid.Column>

                    </Grid>
                }
            </div>
        );
    }
}