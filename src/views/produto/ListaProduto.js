import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import serverRequest from '../../utils/serverRequest';

class ListaProduto extends Component {

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
        let dados = await serverRequest.request('/produto/listar');
        if (dados) {
            this.setState({ lista: dados });
        }
    }

    render() {
        return (
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
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
                            return (
                                <tr>
                                    <td>{obj.nome_produto}</td>
                                    <td>{obj.descricao}</td>
                                    <td>{obj.preco.toString().replace('.', ',')}</td>
                                    <td>{obj.ds_menu}</td>
                                    <td>{obj.visivel ? 'Sim' : 'Não'}</td>
                                    <td>{obj.promocao ? 'Sim' : 'Não'}</td>
                                    <td>
                                        <Link to="/cardapio/produto/editar">
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

export default ListaProduto;
