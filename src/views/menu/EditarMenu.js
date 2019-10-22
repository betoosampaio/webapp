import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import serverRequest from '../../utils/serverRequest';
import Modal from 'react-bootstrap/Modal'

class EditarMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ds_menu: "",

        };
    }

    componentDidMount() {
        this.obter(this.props.match.params.id);
    }

    obter = async (id) => {
        let dados = await serverRequest.request('/menu/obter', { "id_menu": id });
        if (dados) {
            this.setState(dados[0]);
        }
    }

    editar = async (event) => {
        event.preventDefault();
        let dados = await serverRequest.request('/menu/editar', this.state);
        if (dados) {
            this.setState({ showEditado: true });
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
                <div>
                    <Card>
                        <CardHeader>
                            <strong>Editar Menu</strong>
                        </CardHeader>
                        <CardBody>

                            <Modal
                                size="md"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                                show={this.state.showEditado}
                                onHide={() => { this.setState({ showEditado: false }) }}
                                backdrop='static'
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Confirmação</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <p>Tem certeza de que deseja Editar este Menu? </p>
                                </Modal.Body>

                                <Modal.Footer>

                                    <Button variant="primary" color="danger" onClick={() => this.setState({ showEditado: false })}  >Não, cancelar</Button>
                                    <Button variant="primary" color="success" onClick={() => { window.location.href = '#/cardapio/menu' }}  >Sim</Button>
                                </Modal.Footer>

                            </Modal>

                            <FormGroup>
                                <Label>Nome do menu:</Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="append">
                                        <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                                    </InputGroupAddon>
                                    <Input name="ds_menu" value={this.state.ds_menu} onChange={this.changeInput} required minLength="4" placeholder="Lanches" />
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
                </div>
            </form>
        );
    }
}

export default EditarMenu;
