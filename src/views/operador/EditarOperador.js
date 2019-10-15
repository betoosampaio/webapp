import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { AppSwitch } from '@coreui/react';
import SelectPerfil from '../../components/selectPerfil/SelectPerfil';
import serverRequest from '../../utils/serverRequest';

class EditarOperador extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id_operador: "",
            nome_operador: "",
            id_perfil: "",
            login_operador: "",
            senha_operador: "",
            ativo: "",
        };
    }

    componentDidMount() {
        this.obter(this.props.match.params.id);
    }

    obter = async (id) => {
        let dados = await serverRequest.request('/operador/obter', { "id_operador": id });
        if (dados) {
            this.setState(dados[0]);
        }
    }

    editar = async (event) => {
        event.preventDefault();
        let dados = await serverRequest.request('/operador/editar', this.state);
        if (dados) {
            window.location.href = '#/operador';
        }
    }

    changeInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    changeSwitch = (event) => {
        this.setState({ [event.target.name]: event.target.checked ? 1 : 0 });
    }

    render() {
        return (
            <form onSubmit={this.editar}>
                <Card>
                    <CardHeader>
                        <strong>Editar Operador</strong>
                    </CardHeader>
                    <CardBody>

                        <FormGroup>
                            <Label>ID:</Label>
                            <Input disabled name="id_operador" value={this.state.id_operador} onChange={this.changeInput} required/>
                        </FormGroup>

                        <FormGroup>
                            <Label>Nome:</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="append">
                                    <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input name="nome_operador" value={this.state.nome_operador} onChange={this.changeInput} required  minLength="4"/>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label>Perfil:</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="append">
                                    <InputGroupText><i className="fa fa-group"></i></InputGroupText>
                                </InputGroupAddon>
                                <SelectPerfil name="id_perfil" value={this.state.id_perfil} onChange={this.changeInput} required></SelectPerfil>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label>Login:</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="append">
                                    <InputGroupText><i className="fa fa-id-card"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input name="login_operador" value={this.state.login_operador} onChange={this.changeInput} required/>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label>Senha:</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="append">
                                    <InputGroupText><i className="fa fa-key"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input type="password" name="senha_operador" value={this.state.senha_operador} onChange={this.changeInput} required/>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label>Ativo:</Label>
                            <InputGroup>
                                <AppSwitch name="ativo" className={'mx-1'} variant={'pill'} color={'success'} checked={this.state.ativo ? true : false} onChange={this.changeSwitch} />
                            </InputGroup>
                        </FormGroup>

                    </CardBody>
                    <CardFooter>
                        <Button type="submit" className="pull-right" color="success"><i className="fa fa-check"></i> Confirmar</Button>
                    </CardFooter>
                </Card>
            </form>
        );
    }
}

export default EditarOperador;
