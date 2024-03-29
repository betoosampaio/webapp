import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';
import CardMesa from './CardMesa';
import IncluirMesa from './IncluirMesa';
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

  obterLista = async () => {
    let dados = await serverRequest.request('/mesa/listar');
    if (dados) {
      this.setState({ lista: dados });
    }
  }

  mesaAdicionada = () => {
    this.setState({ modalNovaMesa: false })
    this.obterLista();
  }

  render() {
    return (
      <div>
        <Button color="success" size="sm" onClick={() => this.setState({ modalNovaMesa: true })}>
          <i className="icon-plus mr-1"></i>Abrir Mesa
        </Button>
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
        <IncluirMesa
          show={this.state.modalNovaMesa}
          onHide={() => { this.setState({ modalNovaMesa: false }) }}
          mesaadicionada={this.mesaAdicionada} />
      </div>
    );
  }
}

export default ListaMesa;
