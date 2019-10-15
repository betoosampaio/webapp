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

    render() {
        return (
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
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
                                <tr>
                                    <td>{obj.ds_menu}</td>
                                    <td>{obj.ativo ? 'Sim' : 'Não'}</td>
                                    <td>
                                        <Link to="/cardapio/menu/editar">
                                            <Button color="secondary" size="sm">
                                                <i className="icon-note"></i>
                                            </Button>
                                        </Link>
                                    </td>
                                    <td>
                                        <Button color="danger" size="sm">
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
