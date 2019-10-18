import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import serverRequest from '../../utils/serverRequest';

const path = process.env.REACT_APP_SRV_PATH;
class dadosRestaurante extends Component {
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


                        <th>Razão Social</th>
                        <th>CEP</th>
                        <th>Endereço</th>
                        <th>Número</th>
                        <th>Complemento</th>
                        <th>Bairro</th>
                        <th>Estado</th>
                        <th>Município</th>


                    </tr>
                </thead>
                <tbody>

                    {

                        this.state.ListaRestaurante.map((obj) => {
                            return (
                                <tr>



                                    <td>{obj.razao_social}</td>
                                    <td>{obj.cep}</td>
                                    <td>{obj.logradouro}</td>
                                    <td>{obj.numero}</td>
                                    <td>{obj.complemento}</td>
                                    <td>{obj.bairro}</td>
                                    <td>{obj.estados}</td>
                                    <td>{obj.municipio}</td>




                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        );
    }
}

export default dadosRestaurante;
