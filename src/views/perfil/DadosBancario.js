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


                        <th>Banco</th>
                        <th>Tipo cadastro de conta</th>
                        <th>Tipo de conta</th>
                        <th>Agência</th>
                        <th>Conta</th>
                        <th>Digito</th>


                    </tr>
                </thead>
                <tbody>

                    {

                        this.state.ListaRestaurante.map((obj) => {
                            return (
                                <tr>



                                    <td>{obj.codigo_banco}</td>
                                    <td>{obj.tipoCadastroConta}</td>
                                    <td>{obj.tipo_conta}</td>
                                    <td>{obj.agencia}</td>
                                    <td>{obj.conta}</td>
                                    <td>{obj.digito}</td>
                                    



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