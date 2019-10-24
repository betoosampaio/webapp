import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import serverRequest from '../../utils/serverRequest';
import Foto from '../../components/uploadFoto/Foto';
import Modal from 'react-bootstrap/Modal'
import { FormGroup, Label, InputGroup } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import SelectMenu from '../../components/selectMenu/SelectMenu';

class ListaProduto extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id_menu: "",
            showVisivel: "",
            showDelete: false,
            lista: [],
        };
    }

    componentDidMount() {
        this.obterLista();

    }

    obterLista = async function () {
        let dados = await serverRequest.request('/produto/listar');
        if (dados) {
            this.setState({ lista: dados });
        }
    }


    remover = async (id) => {

        let dados = await serverRequest.request('/produto/remover', { "id_produto": id });
        if (dados) {
            this.obterLista();
            this.setState({ showDelete: false });
        }

    }


    changeSwitch = (event) => {
        this.setState({ [event.target.name]: event.target.checked ? 1 : 0 });
    }

    changeInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }



    render() {

        return (

            <Table striped bordered hover responsive>





                <thead>
                    <FormGroup className="mt-4">
                        <InputGroup>
                            <Label>Mostrar produtos inativos:</Label>

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




                    <FormGroup className="mt-4">
                        <InputGroup>


                            <input
                                type="text"
                                className="input"
                                id="addInput"
                                placeholder="Something that needs ot be done..."
                            />

                            <SelectMenu name="id_menu" value={this.state.id_menu} onChange={this.changeInput} required></SelectMenu>


                        </InputGroup>
                    </FormGroup>


                    <tr>
                        <th>ID</th>
                        <th>Foto</th>
                        <th>Nome do Produto</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Menu</th>
                        <th>Visível</th>
                        <th>Promoção</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.lista.map((obj) => {

                            if (this.state.id_menu === 1) {

                                return (

                                    <tr key={obj.id_produto}>
                                        <td>{obj.id_produto}</td>
                                        <td><Foto src={obj.imagem} height="50" width="50"></Foto></td>

                                    </tr>
                                );
                            }


                            if (this.state.showVisivel === 1) {


                                return (

                                    <tr key={obj.id_produto}>
                                        <td>{obj.id_produto}</td>
                                        <td><Foto src={obj.imagem} height="50" width="50"></Foto></td>
                                        <td>{obj.nome_produto}</td>
                                        <td>{obj.descricao}</td>

                                        <td>R$ {obj.preco.toFixed(2).replace('.', ',')}</td>

                                        <td>{obj.ds_menu}</td>
                                        <td>{obj.visivel ? 'Sim' : 'Não'}</td>
                                        <td>{obj.promocao ? 'Sim' : 'Não'}</td>
                                        <td>
                                            <Link to={{ pathname: `/cardapio/produto/editar/${obj.id_produto}` }}>
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
                                                    <Button variant="primary" color="success" onClick={() => this.remover(obj.id_produto)}>Sim Excluir</Button>
                                                </Modal.Footer>

                                            </Modal>

                                            <Button onClick={() => this.setState({ showDelete: true })} color="danger" size="sm">

                                                <i className="icon-close"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            } if (obj.visivel === 1) {

                                return (
                                    <tr key={obj.id_produto}>
                                        <td>{obj.id_produto}</td>
                                        <td><Foto src={obj.imagem} height="50" width="50"></Foto></td>
                                        <td>{obj.nome_produto}</td>
                                        <td>{obj.descricao}</td>

                                        <td>R$ {obj.preco.toFixed(2).replace('.', ',')}</td>

                                        <td>{obj.ds_menu}</td>
                                        <td>{obj.visivel ? 'Sim' : 'Não'}</td>
                                        <td>{obj.promocao ? 'Sim' : 'Não'}</td>
                                        <td>
                                            <Link to={{ pathname: `/cardapio/produto/editar/${obj.id_produto}` }}>
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
                                                    <Button variant="primary" color="success" onClick={() => this.remover(obj.id_produto)}>Sim Excluir</Button>
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

export default ListaProduto;
