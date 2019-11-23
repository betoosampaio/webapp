import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';
import ListaLancamentos from './ListaLancamentos';

class DetalheCaixa extends Component {

  constructor(props) {

    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.obter(this.props.match.params.id);
  }

  obter = async (id) => {
    let dados = await serverRequest.request('/caixa/obter', { "id_caixa": id });
    if (dados) {
      this.setState(dados[0]);
    }
  }

  atualizou = () => {
    this.obter(this.props.match.params.id)
  }

  render() {
    return (
      <div>
        <Row className="mb-3">
          <h2 className="ml-3">Caixa {this.state.numero}</h2>
        </Row>
        <Row>
          <Col lg="4">
            <Card>
              <CardBody>
                <Row>
                  <Col xs="8">
                    <div className={"callout callout-" + this.state.aberta ? "success" : "danger"}>
                      <small className="text-muted pull-left">Status</small>
                      <br />
                      <strong className="h4">
                        {this.state.status}
                      </strong>
                    </div>
                  </Col>
                  <Col xs="4">
                    {this.state.aberto &&
                      <Button
                        onClick={() => this.fechar()}
                        className="pull-right"
                        style={{ height: "100%" }}>
                        <i className="icon-calculator" /> Fechar Caixa
                    </Button>
                    }
                    {this.state.fechado &&
                      <Button
                        onClick={() => this.reabrir()}
                        className="pull-right"
                        style={{ height: "100%" }}>
                        <i className="icon-action-redo" /> Reabrir Caixa
                    </Button>
                    }
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="8">
            <Card>
              <CardBody>
                <Row>
                  <Col sm="4">
                    <div className="callout callout-success">
                      <small className="text-muted">Entradas</small>
                      <br />
                      <strong className="h4"></strong>
                    </div>
                  </Col>
                  <Col sm="4">
                    <div className="callout callout-danger">
                      <small className="text-muted">Saídas</small>
                      <br />
                      <strong className="h4"></strong>
                    </div>
                  </Col>
                  <Col sm="4">
                    <div className="callout callout-info">
                      <small className="text-muted">Saldo Final</small>
                      <br />
                      <strong className="h4"></strong>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <ListaLancamentos
              id_caixa={this.state._id}
              atualizou={this.atualizou}
              saldo_inicial={this.state.saldo_inicial}
              data_abriu={this.state.data_abriu}
              suprimentos={this.state.suprimentos}
              sangrias={this.state.sangrias} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default DetalheCaixa;