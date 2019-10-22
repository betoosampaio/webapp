import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import serverRequest from '../../utils/serverRequest';


class EditarDadosPessoais extends Component {

    constructor(props) {

        super(props);
        this.state = {
            nome_administrador: "",
            cpf_administrador: "",
            email: "",
            celular: "",
        }

    };

    validarCelular = (event) => {
        let ok = false, msg = '';
        let val = event.target.value.replace(/\D/g, '');
        if (!val) {
            msg = 'Campo obrigatório';
        }
        else if (val.length < 11) {
            msg = 'Celular incompleto';
        }
        else {
            ok = true;
        }

        let newState = Object.assign({}, this.state.validacao);
        newState.celular.ok = ok;
        newState.celular.msg = msg;
        this.setState({ validacao: newState });
    }

    validarCPF = (event) => {
        let ok = false, msg = '';
        let val = event.target.value.replace(/\D/g, '');
        if (!val) {
            msg = 'Campo obrigatório';
        }
        else if (!this.testarCPF(val)) {
            msg = 'CPF incorreto';
        }
        else {
            ok = true;
        }

        let newState = Object.assign({}, this.state.validacao);
        newState.cpf_administrador.ok = ok;
        newState.cpf_administrador.msg = msg;
        this.setState({ validacao: newState });
    }

    testarCPF = (strCPF) => {
        var Soma;
        var Resto;
        Soma = 0;
        if (strCPF === "00000000000") return false;

        for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11)) Resto = 0;
        if (Resto !== parseInt(strCPF.substring(9, 10))) return false;

        Soma = 0;
        for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11)) Resto = 0;
        if (Resto !== parseInt(strCPF.substring(10, 11))) return false;
        return true;
    }

    validarEmail = (event) => {
        let ok = false, msg = '';
        let val = event.target.value;
        if (!val) {
            msg = 'Campo obrigatório';
        }
        else if (!/.+@.+\..+/.test(val)) {
            msg = 'Email incorreto';
        }
        else {
            ok = true;
        }

        let newState = Object.assign({}, this.state.validacao);
        newState.email.ok = ok;
        newState.email.msg = msg;
        this.setState({ validacao: newState });
    }

    componentDidMount() {
        this.obter(this.props.match.params.id);
    }

    obter = async (id) => {
        let dados = await serverRequest.request('/restaurante/obter', { "id_restaurante": id });
        if (dados) {
            this.setState(dados[0]);
        }
    }

    editar = async (event) => {
        event.preventDefault();
        let dados = await serverRequest.request('/restaurante/editar', this.state);
        if (dados) {
            window.location.href = '#/perfil';
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

            <form name="form" onSubmit={this.editar}>
                <Card>
                    <CardHeader>
                        <h5><b>Editar dados pessoais</b></h5>
                    </CardHeader>
                    <CardBody>

                        <FormGroup>
                            <Label><b>Nome do Administrador:</b></Label>
                            <InputGroup>
                                <InputGroupAddon addonType="append">
                                    <InputGroupText><i className="icon-user"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input name="nome_administrador" value={this.state.nome_administrador} onChange={this.changeInput} />
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label><b>CPF do Administrador:</b></Label>
                            <InputGroup>
                                <InputGroupAddon addonType="append">
                                    <InputGroupText><i className="icon-user"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input name="cpf_administrador" value={this.state.cpf_administrador} onChange={this.changeInput} />
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label><b>E-mail do Administrador:</b></Label>
                            <InputGroup>
                                <InputGroupAddon addonType="append">
                                    <InputGroupText><i className="icon-envelope"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input name="email" value={this.state.email} onChange={this.changeInput} type="email" />
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label><b>Celular do Administrador:</b></Label>
                            <InputGroup>
                                <InputGroupAddon addonType="append">
                                    <InputGroupText><i className="icon-phone"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input name="celular" value={this.state.celular} onChange={this.changeInput} />
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

export default EditarDadosPessoais;