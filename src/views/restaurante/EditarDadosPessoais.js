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
        };
    }

    componentDidMount() {
        this.obter(this.props.match.params.id);
    }

    obter = async (id) => {
        let dados = await serverRequest.request('/restaurante/obter', { "id_menu": id });
        if (dados) {
            this.setState(dados[0]);
        }
    }

    editar = async (event) => {
        event.preventDefault();
        let dados = await serverRequest.request('/gerenciar/restaurante/editar', this.state);
        if (dados) {
            window.location.href = '#/gerenciar';
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
                        <strong>Editar dados pessoais</strong>
                    </CardHeader>
                    <CardBody>

                        <FormGroup>
                            <Label>Nome do Administrador:</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="append">
                                    <InputGroupText><i className="icon-user"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input name="nome_administrador" value={this.state.nome_administrador} onChange={this.changeInput} required minLength="4" />
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label>CPF do Administrador:</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="append">
                                    <InputGroupText><i className="icon-user"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input name="cpf_administrador" value={this.state.cpf_administrador} onChange={this.changeInput} required minLength="11" />
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label>E-mail do Administrador:</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="append">
                                    <InputGroupText><i className="icon-envelope"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input name="email" value={this.state.email} onChange={this.changeInput} type="email" />
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label>Celular do Administrador:</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="append">
                                    <InputGroupText><i className="icon-eye"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input name="celular" value={this.state.celular} onChange={this.changeInput} required minLength="13" />
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
