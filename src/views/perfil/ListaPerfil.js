import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import serverRequest from '../../utils/serverRequest';

class ListaPerfil extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lista: [],
        };
    }

    componentDidMount() {
        this.obterLista();
    }

    obterLista = async () => {
        let dados = await serverRequest.request('/perfil/listar');
        if (dados) {
            this.setState({ lista: dados });
        }
    }

    remover = async (id) => {
        let dados = await serverRequest.request('/operador/remover', { "id_operador": id });
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
                        <th>Nome</th>
                        <th>Perfil</th>
                        <th>Login</th>
                        <th>Status</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.lista.map((obj) => {
                            return (
                                <tr key={obj.id_operador}>
                                    <td>{obj.id_operador}</td>
                                    <td>{obj.nome_operador}</td>
                                    <td>{obj.tipo_perfil}</td>
                                    <td>{obj.login_operador}</td>
                                    <td>{obj.ativo ? 'Operador Ativo' : 'Operador Desativado'}</td>
                                    <td>
                                        <Link to={{ pathname: `/operador/editar/${obj.id_operador}` }}>
                                            <Button color="secondary" size="sm">
                                                <i className="icon-note"></i>
                                            </Button>
                                        </Link>
                                    </td>
                                    <td>
                                        <Button onClick={() => this.remover(obj.id_operador)} color="danger" size="sm">
                                            <i className="icon-user-unfollow"></i>
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

export default ListaPerfil;
