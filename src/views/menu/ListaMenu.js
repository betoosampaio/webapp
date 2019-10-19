import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import serverRequest from '../../utils/serverRequest';

class ListaMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
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
        }
    }

    render() {
        return (
            <Table striped bordered hover responsive>
                <thead>
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
                                        <Button onClick={() => this.remover(obj.id_menu)} color="danger" size="sm">
                                            <i className="icon-close"></i>
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        );
    }
}

export default ListaMenu;
