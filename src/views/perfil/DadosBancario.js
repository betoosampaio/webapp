import React, { Component } from 'react';
import { Table, Button, ListGroup, ListGroupItem } from 'reactstrap';
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



        let restaurante = await res.json()
        this.setState({ ListaRestaurante: restaurante[0] });

    }


    componentDidMount() {
        this.mostrarConteudo();

    }




    render() {
        return (
            <ListGroup>
                <ListGroupItem><b>Banco: </b>{this.state.ListaRestaurante.codigo_banco}</ListGroupItem>
                <ListGroupItem><b>Tipo cadastro conta: </b>{this.state.ListaRestaurante.tipoCadastroConta}</ListGroupItem>
                <ListGroupItem><b>Tipo conta: </b>{this.state.ListaRestaurante.tipo_conta}</ListGroupItem>
                <ListGroupItem><b>Agência: </b>{this.state.ListaRestaurante.agencia}</ListGroupItem>
                <ListGroupItem><b>Conta: </b>{this.state.ListaRestaurante.conta} - {this.state.ListaRestaurante.digito}</ListGroupItem>
            </ListGroup>


        );
    }
}

export default ListaPerfil;
