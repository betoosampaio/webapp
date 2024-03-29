import React, { Component } from 'react';
import { Card, CardBody, Button, Row, Col, ListGroupItem, ListGroup, ButtonDropdown, ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';
import Confirm from 'reactstrap-confirm';
import IncluirItem from './IncluirItem';
import IncluirPagamento from './IncluirPagamento';
import ResumoMesa from './ResumoMesa';
import ListaItems from './ListaItems';
import FechamentoMesa from './FechamentoMesa';
import Modal from 'react-bootstrap/Modal'
import ListaPagamentos from './ListaPagamentos';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class DetalheMesa extends Component {

  constructor(props) {
    super(props);
    this.state = {

      dropdownOpen: false,
      modalInfosMesa: false,
      produtos: [],
      pagamentos: [],
      id_mesa: "",
      id_operador: "",
      mostrar: '1',

    };
  }



  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
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


  vlrTxServico = () => { return this.state.valor_produtos * this.state.taxa_servico }

  vlrTotal = () => {
    let vlr = (this.state.valor_produtos * (1 + this.state.taxa_servico)).toFixed(2)/1;
    vlr -= this.state.desconto;
    return vlr;
  }

  vlrRestante = () => {
    let vlrRestante = this.vlrTotal() - this.state.valor_pagamentos;
    if (vlrRestante < 0) vlrRestante = 0;
    return vlrRestante;
  }

  moneyFormat = (valor) => {
    try {
      return `R$ ${valor.toFixed(2)}`;
    } catch{
      return "R$ 0,00"
    }

  }

  itemIncluso = () => {
    this.setState({ modalAdicionarItem: false })
    this.obter(this.props.match.params.id);
  }

  pagamentoIncluso = () => {
    this.setState({ modalAdicionarPagamento: false })
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
        this.props.history.push("/mesas");

      }
    }
  }

  reabrirMesa = async (id_mesa) => {


    let confirm = await Confirm({
      title: "Confirmação",
      message: "Tem certeza que deseja reabrir essa conta?",
      confirmColor: "success",
      confirmText: "Confirmar",
      cancelColor: "danger",
      cancelText: "Cancelar",
    });

    if (confirm) {
      let dados = await serverRequest.request('/mesa/reabrir', { "id_mesa": id_mesa });
      if (dados) {
        this.obter(this.props.match.params.id);
        toast("Mesa reaberta com sucesso!", { className: "toast-success" });
      }
    }
  }

  encerrarMesa = async (id_mesa) => {

    if (this.state.valor_pagamentos < this.vlrTotal()) {
      toast("Há pagamentos pendentes.", { className: "toast-danger" });
    }
    else {

      let confirm = await Confirm({
        title: "Confirmação",
        message: "Tem certeza que deseja encerrar essa conta?",
        confirmColor: "success",
        confirmText: "Confirmar",
        cancelColor: "danger",
        cancelText: "Cancelar",
      });

      if (confirm) {
        let dados = await serverRequest.request('/mesa/encerrar', { "id_mesa": id_mesa });
        if (dados) {
          this.obter(this.props.match.params.id);

        }
      }
    }
  }

  dateFormat = (data) => {
    let dataRetornar = new Date(data).toLocaleString();
    return dataRetornar;

  }

  render() {

    let classeStatus = () => {
      if (this.state.aberta)
        return "success";
      else if (this.state.fechada && !this.state.encerrada)
        return "warning";
      else if (this.state.encerrada)
        return "danger";
    }

    return (
      <div>

        <ToastContainer />
        <Row className="mb-3">
          <h2 className="ml-3">
            Mesa {this.state.numero}
            <ButtonGroup className="ml-4">
              <ButtonDropdown id='card1' isOpen={this.state.card1} toggle={() => { this.setState({ card1: !this.state.card1 }); }}>
                <DropdownToggle caret className="p-0" color="black"> <i className="icon-settings"></i>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => this.setState({ modalInfosMesa: true })}
                    className="pull-left mr-1"
                    size="sm"
                    title="Detalhes desta mesa">
                    <i className="icon-info" />Detalhes desta mesa
                </DropdownItem>

                  {this.state.fechada && !this.state.encerrada &&
                    <DropdownItem
                      onClick={() => this.encerrarMesa(this.state._id)}
                      className="pull-left mr-1"
                      size="sm"
                      title="Encerrar Mesa">
                      <i className="icon-basket-loaded" />Encerrar Conta
                </DropdownItem>
                  }
                  <DropdownItem
                    className="pull-left mr-1"
                    size="sm"
                    title="Imprimir">
                    <i className="fa fa-print" />Imprimir
                </DropdownItem>

                  {this.state.fechada && !this.state.encerrada &&
                    <DropdownItem onClick={() => this.reabrirMesa(this.state._id)}
                      className="pull-left mr-1"
                      size="sm"
                      title="Reabrir Conta">
                      <i className="icon-action-redo" />Reabrir Conta
                </DropdownItem>
                  }

                  {this.state.aberta &&
                    <DropdownItem onClick={() => this.setState({ modalFechamentoMesa: true })}
                      className="pull-left mr-1"
                      size="sm"
                      title="Fechar Conta">
                      <i className="icon-calculator" />Fechar Conta
                </DropdownItem>
                  }

                  <DropdownItem
                    onClick={() => this.removerMesa(this.state._id)}
                    className="pull-left mr-1"
                    size="sm"
                    title="Cancelar Mesa">
                    <i className="icon-ban" />Cancelar Mesa
                </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </ButtonGroup>
          </h2>
        </Row>
        <Row>
          <Col lg="4">
            <Card>
              <CardBody>
                <Row>
                  <Col xs="8">
                    <div className={"callout callout-" + classeStatus()}>
                      <small className="text-muted pull-left">Status</small>
                      <br />
                      <strong className="h4">
                        {this.state.status}
                      </strong>
                    </div>
                  </Col>
                  <Col xs="4">
                    {this.state.aberta &&
                      <Button
                        onClick={() => this.setState({ modalFechamentoMesa: true })}
                        className="pull-right"
                        style={{ height: "100%" }}
                      >
                        <i className="icon-calculator" /> Fechar Conta
                    </Button>
                    }
                    {this.state.fechada && !this.state.encerrada && this.vlrRestante() <= 0 &&
                      <Button
                        onClick={() => this.encerrarMesa(this.state._id)}
                        className="pull-right"
                        style={{ height: "100%" }}>
                        <i className="icon-basket-loaded" /> Encerrar Conta
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
                    <div className="callout callout-info">
                      <small className="text-muted">Valor Final</small>
                      <br />
                      <strong className="h4">{this.moneyFormat(this.vlrTotal())}</strong>
                    </div>
                  </Col>
                  <Col sm="4">
                    <div className="callout callout-success">
                      <small className="text-muted">Valor Pago</small>
                      <br />
                      <strong className="h4">
                        {this.moneyFormat(this.state.valor_pagamentos)}
                      </strong>

                    </div>
                  </Col>
                  <Col sm="4">
                    <div className="callout callout-danger">
                      <small className="text-muted">Valor Restante</small>
                      <br />
                      <strong className="h4">{this.moneyFormat(this.vlrRestante())}</strong>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={7}>

            <ListaItems
              produtos={this.state.produtos}
              qtdProdutos={this.state.qtd_produtos}
              vlrProdutos={this.state.valor_produtos}
              novoProduto={() => this.setState({ modalAdicionarItem: true })}
              id_mesa={this.state._id}
              atualizou={() => this.obter(this.props.match.params.id)}
              aberta={this.state.aberta} />


          </Col>
          <Col md={5}>
            <ListaPagamentos
              adicionarPagamento={() => this.setState({ modalAdicionarPagamento: true })}
              pagamentos={this.state.pagamentos}
              vlrPagamentos={this.state.valor_pagamentos}
              id_mesa={this.state._id}
              atualizou={() => this.obter(this.props.match.params.id)}
              encerrada={this.state.encerrada} />

            <ResumoMesa
              novoProduto={() => this.setState({ modalAdicionarItem: true })}
              vlrProdutos={this.state.valor_produtos}
              vlrTxServico={this.vlrTxServico()}
              vlrDesconto={this.state.desconto}
              vlrTotal={this.vlrTotal()}
              desconto={this.state.desconto}
              taxa_servico={this.state.taxa_servico}
              id_mesa={this.state._id}
              fechada={this.state.fechada}
              aberta={this.state.aberta}
              atualizou={() => this.obter(this.props.match.params.id)} />
          </Col>
        </Row>
        <IncluirItem

          show={this.state.modalAdicionarItem}
          onHide={() => { this.setState({ modalAdicionarItem: false }) }}
          id_mesa={this.state._id}
          itemincluso={this.itemIncluso} />

        <IncluirPagamento
          show={this.state.modalAdicionarPagamento}
          onHide={() => { this.setState({ modalAdicionarPagamento: false }) }}
          id_mesa={this.state._id}
          pagamentoincluso={this.pagamentoIncluso}
        />
        <FechamentoMesa
          show={this.state.modalFechamentoMesa}
          onHide={() => { this.setState({ modalFechamentoMesa: false }) }}
          id_mesa={this.state._id}
          item={this.state.detalheItemSelecionado}
          novoProduto={() => this.setState({ modalAdicionarItem: true })}
          vlrProdutos={this.state.valor_produtos}
          vlrTxServico={this.vlrTxServico()}
          vlrDesconto={this.state.desconto}
          vlrTotal={this.vlrTotal()}
          desconto={this.state.desconto}
          taxa_servico={this.state.taxa_servico}
          atualizou={() => this.obter(this.props.match.params.id)}

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
              <ListGroupItem><b>Status:</b> {this.state.status}</ListGroupItem>
              <ListGroupItem><b>Operador que abriu a mesa:</b> {this.state.nome_operador} </ListGroupItem>
              <ListGroupItem><b>Data e hora de abertura da mesa:</b> {this.dateFormat(this.state.data_abriu)} </ListGroupItem>
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ modalInfosMesa: false })} > Voltar
            </Button>
          </Modal.Footer>
        </Modal >
      </div >
    );
  }
}

export default DetalheMesa;
