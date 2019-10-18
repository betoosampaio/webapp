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
            <ListGroupItem><b>Celular:</b> {this.state.ListaRestaurante.celular}</ListGroupItem>
            <ListGroupItem><b>Email:</b> {this.state.ListaRestaurante.email}</ListGroupItem>
            <ListGroupItem><b>CPF administrador:</b> {this.state.ListaRestaurante.cpf_administrador}</ListGroupItem>
            <ListGroupItem><b>Nome administrador:</b> {this.state.ListaRestaurante.nome_administrador}</ListGroupItem>
            </ListGroup>
         
        );
    }
}

export default ListaPerfil;
