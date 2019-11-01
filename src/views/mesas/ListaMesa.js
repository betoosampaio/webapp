import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import serverRequest from '../../utils/serverRequest';
import CardMesa from './CardMesa';

class ListaMesa extends Component {

  constructor(props) {
    super(props);

    this.state = {
      lista: []
    };
  }

  componentDidMount() {
    this.obterLista();
  }

  obterLista = async () => {
    let dados = await serverRequest.request('/mesa/listar');
    if (dados) {
      this.setState({ lista: dados });
    }
  }

  render() {
    return (
      <div>
        <Link to="/mesas/cadastrar">
          <Button color="success" size="sm">
            <i className="icon-plus mr-1"></i>Nova Mesa
            </Button>
        </Link>
        <p></p>
        <Row>
          {
            this.state.lista.map((obj) => {
              return (
                <Col xs="12" sm="6" lg="3" key={obj._id}>
                  <CardMesa mesa={obj} atualizar={this.obterLista} />
                </Col>
              );
            })
          }
        </Row>
      </div>
    );
  }
}

export default ListaMesa;
