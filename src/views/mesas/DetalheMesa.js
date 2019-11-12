import React, { Component } from 'react';
import { Card, CardBody, Button, Row, Col, ListGroupItem, ListGroup } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';
import Confirm from 'reactstrap-confirm';
import IncluirItem from './IncluirItem';
import FormaPagamento from './FormaPagamento';
import DetalheMesaResumo from './DetalheMesaResumo';
import DetalheMesaProdutos from './DetalheMesaProdutos';
import Modal from 'react-bootstrap/Modal'
import DetalheMesaPagamentos from './DetalheMesaPagamentos';

class DetalheMesa extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalInfosMesa: false,
      produtos: [],
      pagamentos: [],
      id_mesa: "",
    };
  }

  componentDidMount() {
    this.obter(this.props.match.params.id);
  }

  obter = async (id) => {
    let dados = await serverRequest.request('/mesa/obter', { "id_mesa": id });
    if (dados) {
      this.setState(dados[0]);
    }
  }

  vlrProdutos = () => {
    let vl = 0;
    vl = this.state.produtos.reduce((sum, key) =>
      sum + (key.removido ? 0 : key.preco * key.quantidade), 0)
    return vl;
  }

  qtdProdutos = () => {
    let qt = 0;
    qt = this.state.produtos.reduce((sum, key) =>
      sum + (key.removido ? 0 : parseInt(key.quantidade)), 0)
    return qt;
  }

  vlrPagamentos = () => {
    let vl = 0;
    vl = this.state.pagamentos.reduce((sum, key) =>
      sum + (key.removido ? 0 : key.valor), 0)
    return vl;
  }

  vlrTxServico = () => { return parseFloat(this.state.taxa_servico) || 0 }
  vlrDesconto = () => { return parseFloat(this.state.desconto) || 0 }

  vlrTotal = () => {
    let
      vl = 0,
      txservico = parseFloat(this.state.taxa_servico) || 0,
      desconto = parseFloat(this.state.desconto) || 0;

    vl = this.state.produtos.reduce((sum, key) =>
      sum + (key.removido ? 0 : key.preco * key.quantidade), 0)
    return (vl + txservico - desconto);
  }

  vlrRestante = () => {
    return this.vlrTotal() - this.vlrPagamentos();
  }

  moneyFormat = (valor) => {
    return `R$ ${valor.toFixed(2)}`;
  }

  itemIncluso = () => {
    this.setState({ modalAdicionarItem: false })
    this.obter(this.props.match.params.id);
  }

  removerMesa = async (id_mesa) => {
    let confirm = await Confirm({
      title: "Confirmação",
      message: "Tem certeza que deseja cancelar essa conta?",
      confirmColor: "success",
      confirmText: "Confirmar",
      cancelColor: "danger",
      cancelText: "Cancelar",
    });

    if (confirm) {
      let dados = await serverRequest.request('/mesa/remover', { "id_mesa": id_mesa });
      if (dados) {
        window.location.href = '/#/mesas'
      }

    }
  }

  fecharMesa = async (id_mesa) => {
    let confirm = await Confirm({
      title: "Confirmação",
      message: "Tem certeza que deseja encerrar essa conta?",
      confirmColor: "success",
      confirmText: "Confirmar",
      cancelColor: "danger",
      cancelText: "Cancelar",
    });

    if (confirm) {
      let dados = await serverRequest.request('/mesa/fechar', { "id_mesa": id_mesa });
      if (dados) {
        window.location.href = '/#/mesas'
      }
    }
  }

  dateFormat = (data) => {
    let dataRetornar = new Date(data).toLocaleString();
    return dataRetornar;

  }

  render() {
    return (
      <div>
        <h2 className="mb-4">Mesa {this.state.numero}</h2>
        <Row>
          <Col xs="12" sm="6" lg="4">
            <Card>
              <CardBody>
                <Button
                  className="pull-right bg-danger"
                  onClick={() => this.removerMesa(this.state._id)}
                  size="sm"
                  title="Cancelar Mesa">
                  <i className="icon-ban" />
                </Button>
                <Button
                  className="pull-right bg-primary mr-1"
                  onClick={() => this.fecharMesa(this.state._id)}
                  size="sm"
                  title="Fechar Conta">
                  <i className="icon-basket-loaded" />
                </Button>
                <Button
                  className="pull-right bg-secondary mr-1"
                  onClick={() => this.setState({ modalInfosMesa: true })}
                  size="sm"
                  title="Fechar Conta">
                  <i className="icon-star" />
                </Button>

                <div className="callout">
                  <small className="text-muted">Status</small>
                  <br />
                  <strong className="h4">{this.state.aberta ? "Aberta" : "Fechada"}</strong>
                  <div className="chart-wrapper">
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" lg="8">
            <Card>
              <CardBody>
                <Row>
                  <Col sm="4">
                    <div className="callout callout-info">
                      <small className="text-muted">Valor Total</small>
                      <br />
                      <strong className="h4">{this.moneyFormat(this.vlrTotal())}</strong>
                      <div className="chart-wrapper">
                      </div>
                    </div>
                  </Col>
                  <Col sm="4">
                    <div className="callout callout-success">
                      <small className="text-muted">Valor Pago</small>
                      <br />
                      <strong className="h4">{this.moneyFormat(this.vlrPagamentos())}</strong>
                      <div className="chart-wrapper">
                      </div>
                    </div>
                  </Col>
                  <Col sm="4">
                    <div className="callout callout-danger">
                      <small className="text-muted">Valor Restante</small>
                      <br />
                      <strong className="h4">{this.moneyFormat(this.vlrRestante())}</strong>
                      <div className="chart-wrapper">
                      </div>
                      <Button onClick={() => this.setState({ modalAdicionarPagamento: true })}
                        className="pull-right bg-success mr-1"
                        size="sm"
                        title="Inserir Pagamento">
                        <i className="fa fa-money" />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={8} lg={7}>

            <DetalheMesaProdutos
              produtos={this.state.produtos}
              qtdProdutos={this.qtdProdutos()}
              vlrProdutos={this.vlrProdutos()}
              novoProduto={() => this.setState({ modalAdicionarItem: true })}
              id_mesa={this.state._id}
              atualizou={() => this.obter(this.props.match.params.id)} />
          </Col>
          <Col xs={12} md={4} lg={5}>

            <DetalheMesaResumo
              novoProduto={() => this.setState({ modalAdicionarItem: true })}
              vlrProdutos={this.vlrProdutos()}
              vlrTxServico={this.vlrTxServico()}
              vlrDesconto={this.vlrDesconto()}
              vlrTotal={this.vlrTotal()}
              id_mesa={this.state._id}
              atualizou={() => this.obter(this.props.match.params.id)} />

            <DetalheMesaPagamentos
              adicionarPagamento={() => this.setState({ modalAdicionarPagamento: true })}
              pagamentos={this.state.pagamentos}
              vlrPagamentos={this.vlrPagamentos()}
              id_mesa={this.state._id} />
          </Col>
        </Row>
        <IncluirItem
          show={this.state.modalAdicionarItem}
          onHide={() => { this.setState({ modalAdicionarItem: false }) }}
          id_mesa={this.state._id}
          itemincluso={this.itemIncluso} />

        <FormaPagamento
          show={this.state.modalAdicionarPagamento}
          onHide={() => { this.setState({ modalAdicionarPagamento: false }) }}

          id_mesa={this.state._id}
        />



        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop='static'
          show={this.state.modalInfosMesa}
          onHide={() => this.setState({ modalInfosMesa: false })}
          onBlur={this.dateFormat}>

          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" className="callout">Detalhes desta mesa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              <ListGroupItem><b>Status:</b> {this.state.aberta ? "Aberta" : "Fechada"}</ListGroupItem>
              <ListGroupItem><b>Operador que abriu a mesa:</b> {this.state.id_operador_abertura} </ListGroupItem>
              <ListGroupItem><b>Data e hora de abertura da mesa:</b> {this.dateFormat(this.data_abertura)} </ListGroupItem>

            </ListGroup>



          </Modal.Body>
          <Modal.Footer>

            <Button variant="primary" color="warning" className="icon-arrow-left" onClick={() => this.setState({ modalInfosMesa: false })} > Voltar
            </Button>

          </Modal.Footer>

        </Modal >



      </div >
    );
  }
}

export default DetalheMesa;
