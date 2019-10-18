import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import serverRequest from '../../utils/serverRequest';

const path = process.env.REACT_APP_SRV_PATH;
class ListaPerfil extends Component {
    state = {
        ListaRestaurante: [],
    }

    mostrarConteudo = async function () {
        let res = await fetch(path + '/restaurante/obter', {
            method: 'POST',
            headers: {
                'token': localStorage.getItem('token')
            },
        });


        this.setState({ ListaRestaurante: await res.json() });

    }


    componentDidMount() {
        this.mostrarConteudo();

    }




    render() {
        return (

            <Table striped bordered hover>
                <thead>
                    <tr>


                        <th>Celular</th>
                        <th>E-mail</th>
                        <th>CPF Administrador</th>
                        <th>Nome Administrador</th>


                    </tr>
                </thead>
                <tbody>

                    {

                        this.state.ListaRestaurante.map((obj) => {
                            return (
                                <tr>

                                    <td>{obj.celular}</td>
                                    <td>{obj.email}</td>
                                    <td>{obj.cpf_administrador}</td>
                                    <td>{obj.nome_administrador}</td>
                                
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
