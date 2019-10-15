import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import CardMesa from './CardMesa';

class ListaMesa extends Component {

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
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs="12" sm="6" lg="3">
                        <CardMesa header="Mesa 1" mainText="Descrição" color="primary" footer link="#/gerenciar/detalhemesa" />
                    </Col>
                    <Col xs="12" sm="6" lg="3">
                        <CardMesa header="Mesa 2" mainText="Descrição" color="info" footer link="#/gerenciar/detalhemesa" />
                    </Col>
                    <Col xs="12" sm="6" lg="3">
                        <CardMesa header="Mesa 5" mainText="Descrição" color="warning" footer link="#/gerenciar/detalhemesa" />
                    </Col>
                    <Col xs="12" sm="6" lg="3">
                        <CardMesa header="Mesa 7" mainText="Descrição" color="danger" footer link="#/gerenciar/detalhemesa" />
                    </Col>
                    <Col xs="12" sm="6" lg="3">
                        <CardMesa header="Mesa 8" mainText="Descrição" color="primary" footer link="#/gerenciar/detalhemesa" />
                    </Col>
                    <Col xs="12" sm="6" lg="3">
                        <CardMesa header="Mesa 10" mainText="Descrição" color="info" footer link="#/gerenciar/detalhemesa" />
                    </Col>
                    <Col xs="12" sm="6" lg="3">
                        <CardMesa header="Mesa 11" mainText="Descrição" color="warning" footer link="#/gerenciar/detalhemesa" />
                    </Col>
                    <Col xs="12" sm="6" lg="3">
                        <CardMesa header="Mesa 11B" mainText="Descrição" color="danger" footer link="#/gerenciar/detalhemesa" />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ListaMesa;
