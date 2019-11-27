import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';
import ListaLancamentos from './ListaLancamentos';
import ListaPagamentos from './ListaPagamentos';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Confirm from 'reactstrap-confirm';

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

  reabrir = async () => {
    let confirm = await Confirm({
      title: "Confirmação",
      message: "Tem certeza que deseja reabrir esse caixa?",
      confirmColor: "success",
      confirmText: "Confirmar",
      cancelColor: "danger",
      cancelText: "Cancelar",
    });

    if (confirm) {
      let dados = await serverRequest.request('/caixa/reabrir', { "id_caixa": this.state._id });
      if (dados) {
        this.obter(this.props.match.params.id);
        toast("Caixa reaberto com sucesso!", { className: "toast-success" });
      }
    }
  }

  fechar = async () => {
    let confirm = await Confirm({
      title: "Confirmação",
      message: "Tem certeza que deseja fechar esse caixa?",
      confirmColor: "success",
      confirmText: "Confirmar",
      cancelColor: "danger",
      cancelText: "Cancelar",
    });

    if (confirm) {
      let dados = await serverRequest.request('/caixa/fechar', { "id_caixa": this.state._id });
      if (dados) {
        this.obter(this.props.match.params.id);
        toast("Caixa fechado com sucesso!", { className: "toast-success" });
      }
    }
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
          <Col xs={12} md={5}>
            <ListaLancamentos
              id_caixa={this.state._id}
              id_status={this.state.id_status}
              atualizou={this.atualizou}
              saldo_inicial={this.state.saldo_inicial}
              data_abriu={this.state.data_abriu}
              nome_operador={this.state.nome_operador}
              suprimentos={this.state.suprimentos}
              sangrias={this.state.sangrias} />
          </Col>
          <Col xs={12} md={7}>
            <ListaPagamentos
              pagamentos={this.state.pagamentos} />
          </Col>
        </Row>
        <ToastContainer />
      </div>
    );
  }
}

export default DetalheCaixa;