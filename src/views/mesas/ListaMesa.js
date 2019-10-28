import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
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


        <Link to="/mesas/cadastrar">
          <Button color="success" size="sm">
            <i className="icon-plus"></i>&nbsp;Nova Mesa
            </Button>
        </Link>

        <p></p>

        <Row>

          <Col xs="12" sm="6" lg="3">
            <CardMesa header="Mesa 1" mainText="Descrição" color="primary" footer link="#/gerenciar/detalhemesa" />
          </Col>

        </Row>

      </div>
    );
  }
}

export default ListaMesa;
