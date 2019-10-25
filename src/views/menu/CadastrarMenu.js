import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';
import Modal from 'react-bootstrap/Modal'

class CadastrarMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ds_menu: "",
            validacao: {
                ds_menu: { ok: true, msg: '' },
            },
        }
    }


    cadastrar = async (event) => {
        event.preventDefault();

        let ok = true;

        Object.keys(this.state.validacao).forEach(p => {
            if (!this.state.validacao[p].ok) {
                ok = false;
            }
        });

        if (ok) {
            let dados = await serverRequest.request('/menu/cadastrar', this.state);
            if (dados) {

                this.setState({ showCadastrado: true });
            }
        }
    }

    changeInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    validarSeMenu = async (event) => {
        let ok = false, msg = '';
        let val = event.target.value;
        if (!val) {
            msg = 'Campo obrigatório';
        }
        else if (val.length < 4) {
            msg = 'Código do restuarante deve conter 4 caracteres';
        }
        else {
            ok = true;
            let newState = Object.assign({}, this.state.validacao);
            newState.ds_menu.ok = ok;
            newState.ds_menu.msg = msg;
            this.setState({ validacao: newState });
        }

        let dados = await serverRequest.request('/menu/checarSeMenuExiste', { ds_menu: val });
        if (dados.exists) {
            let newState = Object.assign({}, this.state.validacao);
            newState.ds_menu.ok = false;
            newState.ds_menu.msg = 'Este login já está sendo utilizado';
            this.setState({ validacao: newState });
        }
    }


    render() {
        return (

            <form name="form" onSubmit={this.cadastrar}>
                <Card>
                    <CardHeader>
                        <strong>Cadastrar Menu</strong>
                    </CardHeader>
                    <CardBody>

                        <Modal
                            size="md"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            show={this.state.showCadastrado}
                            onHide={() => { this.setState({ showCadastrado: false }) }}
                            backdrop='static'
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Confirmação</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <p>Menu Cadastrado com sucesso</p>
                            </Modal.Body>

                            <Modal.Footer>

                                <Button variant="primary" color="success" onClick={() => { window.location.href = '#/cardapio/menu' }}  >OK</Button>
                            </Modal.Footer>

                        </Modal>

                        <FormGroup>
                            <Label>Nome do menu:</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="append">
                                    <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    name="ds_menu"
                                    value={this.state.ds_menu}
                                    onChange={this.changeInput}
                                    required
                                    minLength="4"
                                    placeholder="Lanches"
                                    onBlur={this.validarSeMenu}
                                />
                                <span style={{ color: 'red' }}>{this.state.validacao.ds_menu.msg}</span>
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

export default CadastrarMenu;
