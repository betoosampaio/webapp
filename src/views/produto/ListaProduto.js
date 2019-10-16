import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import serverRequest from '../../utils/serverRequest';
import Foto from '../../components/uploadFoto/Foto';

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

    remover = async (id) => {
        let dados = await serverRequest.request('/produto/remover', { "id_produto": id });
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
                            return (
                                <tr key={obj.id_produto}>
                                    <td>{obj.id_produto}</td>
                                    <td><Foto src={obj.imagem} height="100" width="100"></Foto></td>
                                    <td>{obj.nome_produto}</td>
                                    <td>{obj.descricao}</td>
                                    <td>{obj.preco.toString().replace('.', ',')}</td>
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
                                        <Button onClick={() => this.remover(obj.id_produto)} color="danger" size="sm">
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
