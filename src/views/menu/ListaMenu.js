import React, { Component } from 'react';
import { Table, Button, InputGroup, Label, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import serverRequest from '../../utils/serverRequest';
import Modal from 'react-bootstrap/Modal'
import { AppSwitch } from '@coreui/react'

class ListaMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showVisivel: "",
            showDelete: false,
            lista: [],
        };
    }

    componentDidMount() {
        this.obterLista();
    }

    obterLista = async function () {
        let dados = await serverRequest.request('/menu/listar');
        if (dados) {
            this.setState({ lista: dados });
        }
    }

    remover = async (id) => {
        let dados = await serverRequest.request('/menu/remover', { "id_menu": id });
        if (dados) {
            this.obterLista();
            this.setState({ showDelete: false });
        }
    }

    changeSwitch = (event) => {
        this.setState({ [event.target.name]: event.target.checked ? 1 : 0 });
    }

    render() {
        return (
            <Table striped bordered hover responsive>
                <thead>

                    <FormGroup className="mt-4">
                        <InputGroup>
                            <Label>Mostrar menus inativos:</Label>

                            <AppSwitch
                                name="showVisivel"
                                className={'mx-3'}
                                variant={'pill'}
                                color={'success'}
                                checked={this.state.showVisivel ? true : false}
                                onChange={this.changeSwitch}
                            />

                        </InputGroup>
                    </FormGroup>
                    <tr>
                        <th>ID</th>
                        <th>Descrição</th>
                        <th>Ativo</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.lista.map((obj) => {

                            if (this.state.showVisivel === 1) {

                                return (
                                    <tr key={obj.id_menu}>
                                        <td>{obj.id_menu}</td>
                                        <td>{obj.ds_menu}</td>
                                        <td>{obj.ativo ? 'Sim' : 'Não'}</td>
                                        <td>

                                            <Link to={{ pathname: `/cardapio/menu/editar/${obj.id_menu}` }}>
                                                <Button color="secondary" size="sm">
                                                    <i className="icon-note"></i>
                                                </Button>
                                            </Link>
                                        </td>

                                        <td>
                                            <Modal
                                                size="sm"
                                                aria-labelledby="contained-modal-title-vcenter"
                                                centered
                                                show={this.state.showDelete}
                                                onHide={() => { this.setState({ showDelete: false }) }}
                                                backdrop='static'
                                            >
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Confirmação</Modal.Title>
                                                </Modal.Header>

                                                <Modal.Body>
                                                    <p>Você tem certeza que deseja excluir ?</p>
                                                </Modal.Body>

                                                <Modal.Footer>
                                                    <Button variant="secondary" color="danger" onClick={() => this.setState({ showDelete: false })}>Não</Button>
                                                    <Button variant="primary" color="success" onClick={() => this.remover(obj.id_menu)}>Sim, excluir</Button>
                                                </Modal.Footer>

                                            </Modal>

                                            <Button onClick={() => this.setState({ showDelete: true })} color="danger" size="sm">
                                                <i className="icon-close"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                );


                            } if (obj.ativo === 1) {

                                return (
                                    <tr key={obj.id_menu}>
                                        <td>{obj.id_menu}</td>
                                        <td>{obj.ds_menu}</td>
                                        <td>{obj.ativo ? 'Sim' : 'Não'}</td>
                                        <td>

                                            <Link to={{ pathname: `/cardapio/menu/editar/${obj.id_menu}` }}>
                                                <Button color="secondary" size="sm">
                                                    <i className="icon-note"></i>
                                                </Button>
                                            </Link>
                                        </td>

                                        <td>
                                            <Modal
                                                size="sm"
                                                aria-labelledby="contained-modal-title-vcenter"
                                                centered
                                                show={this.state.showDelete}
                                                onHide={() => { this.setState({ showDelete: false }) }}
                                                backdrop='static'
                                            >
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Confirmação</Modal.Title>
                                                </Modal.Header>

                                                <Modal.Body>
                                                    <p>Você tem certeza que deseja excluir ?</p>
                                                </Modal.Body>

                                                <Modal.Footer>
                                                    <Button variant="secondary" color="danger" onClick={() => this.setState({ showDelete: false })}>Não</Button>
                                                    <Button variant="primary" color="success" onClick={() => this.remover(obj.id_menu)}>Sim, excluir</Button>
                                                </Modal.Footer>

                                            </Modal>

                                            <Button onClick={() => this.setState({ showDelete: true })} color="danger" size="sm">
                                                <i className="icon-close"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            }
                        })
                    }
                </tbody>
            </Table>
        );
    }
}

export default ListaMenu;
