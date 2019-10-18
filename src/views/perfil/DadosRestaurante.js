import React, { Component } from 'react';
import { Table, Button, ListGroup, ListGroupItem } from 'reactstrap';
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


        let restaurante = await res.json()
        this.setState({ ListaRestaurante: restaurante[0] });


    }


    componentDidMount() {
        this.mostrarConteudo();

    }




    render() {
        return (
            <ListGroup>
                <ListGroupItem><b>Razão social: </b>{this.state.ListaRestaurante.razao_social}</ListGroupItem>
                <ListGroupItem><b>CEP: </b>{this.state.ListaRestaurante.cep}</ListGroupItem>
                <ListGroupItem><b>Logradoura: </b>{this.state.ListaRestaurante.logradouro}</ListGroupItem>
                <ListGroupItem><b>Número: </b>{this.state.ListaRestaurante.numero}</ListGroupItem>
                <ListGroupItem><b>Complemento: </b>{this.state.ListaRestaurante.complemento}</ListGroupItem>
                <ListGroupItem><b>Bairro: </b>{this.state.ListaRestaurante.bairro}</ListGroupItem>
                <ListGroupItem><b>Estado: </b>{this.state.ListaRestaurante.estados}</ListGroupItem>
                <ListGroupItem><b>Munícipio: </b>{this.state.ListaRestaurante.municipio}</ListGroupItem>
            </ListGroup>

        );
    }
}

export default dadosRestaurante;
