import React, { Component } from 'react';
import { Card, CardBody, Button, Row, Col, ListGroupItem, ListGroup, ButtonDropdown, ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';
import Confirm from 'reactstrap-confirm';
import IncluirItem from './IncluirItem';
import DetalheMesaPagamento from './DetalheMesaPagamento';
import DetalheMesaResumo from './DetalheMesaResumo';
import DetalheMesaProdutos from './DetalheMesaProdutos';
import Modal from 'react-bootstrap/Modal'
import DetalheMesaPagamentos from './DetalheMesaPagamentos';

class DetalheMesa extends Component {

  constructor(props) {
    super(props);
    this.state = {

      dropdownOpen: false,
      modalInfosMesa: false,
      produtos: [],
      pagamentos: [],
      id_mesa: "",
      mostrar: '2',
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

  statusMesa = () => {
    let status = "Aberta";
    if (this.state.fechada) status = "Fechada";
    if (this.state.encerrada) status = "Encerrada";
    return status;
  }

  vlrTxServico = () => { return this.state.valor_produtos * (1 - this.state.desconto) * this.state.taxa_servico }
  vlrDesconto = () => { return this.state.valor_produtos * this.state.desconto }

  vlrTotal = () => {
    return this.state.valor_produtos * (1 - this.state.desconto) * (1 + this.state.taxa_servico);
  }

  vlrRestante = () => {
    return this.vlrTotal() - this.state.valor_pagamentos;
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
        <Row>
          <h2 className="ml-3">Mesa {this.state.numero}</h2>
          <ButtonGroup className="ml-4">
            <ButtonDropdown id='card1' isOpen={this.state.card1} toggle={() => { this.setState({ card1: !this.state.card1 }); }}>
              <DropdownToggle caret className="p-0" color="black"> <i className="icon-settings"> Opções </i>
              </DropdownToggle>
              <DropdownMenu float-right>
                <DropdownItem
                  onClick={() => this.removerMesa(this.state._id)}
                  className="pull-left mr-1"
                  size="sm"
                  title="Cancelar Mesa">
                  <i className="icon-ban" />Cancelar Mesa
                </DropdownItem>
                <DropdownItem onClick={() => this.fecharMesa(this.state._id)}
                  className="pull-left mr-1"
                  size="sm"
                  title="Fechar Conta">
                  <i className="icon-basket-loaded" />Fechar Conta
                </DropdownItem>
                <DropdownItem onClick={() => this.setState({ modalInfosMesa: true })}
                  className="pull-left mr-1"
                  size="sm"
                  title="Detalhes desta mesa">
                  <i className="icon-star" />Detalhes desta mesa

                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </ButtonGroup>
        </Row>

        <Row>
          <Col xs="12" sm="6" lg="4">
            <Card>
              <CardBody>

                <div className="callout">
                  <small className="text-muted">Status</small>
                  <br />



                  {this.state.mostrar === '1' &&
                    <Button
                      onClick={() => this.fecharMesa(this.state._id)}
                      className="pull-right mr-1"
                      size="sm"               
                      title="Fechar Conta">
                      <i className="icon-basket-loaded" /> Fechar Conta
                    </Button>
                  }
                  {this.state.mostrar === '2' &&

                    <Button
                      onClick={() => this.removerMesa(this.state._id)}
                      className="pull-right mr-5"
                      size="sm"
                      title="Cancelar Mesa">
                      <i className="icon-ban" /> Cancelar Mesa                  
                    </Button>
                  }




                  <strong className="h4">{this.statusMesa()}</strong>
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
                      <strong className="h4">{this.moneyFormat(this.state.valor_pagamentos)}
                        <Button onClick={() => this.setState({ modalAdicionarPagamento: true })}
                          className="bg-success ml-2"
                          size="sm"
                          title="Inserir Pagamento">
                          <i className="fa fa-plus" />
                        </Button>
                      </strong>
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
              qtdProdutos={this.state.qtd_produtos}
              vlrProdutos={this.state.valor_produtos}
              novoProduto={() => this.setState({ modalAdicionarItem: true })}
              id_mesa={this.state._id}
              atualizou={() => this.obter(this.props.match.params.id)} />
          </Col>
          <Col xs={12} md={4} lg={5}>

            <DetalheMesaResumo
              novoProduto={() => this.setState({ modalAdicionarItem: true })}
              vlrProdutos={this.state.valor_produtos}
              vlrTxServico={this.vlrTxServico()}
              vlrDesconto={this.vlrDesconto()}
              vlrTotal={this.vlrTotal()}
              id_mesa={this.state._id}
              atualizou={() => this.obter(this.props.match.params.id)} />

            <DetalheMesaPagamentos
              adicionarPagamento={() => this.setState({ modalAdicionarPagamento: true })}
              pagamentos={this.state.pagamentos}
              vlrPagamentos={this.state.valor_pagamentos}
              id_mesa={this.state._id}
              atualizou={() => this.obter(this.props.match.params.id)} />
          </Col>
        </Row>
        <IncluirItem
          show={this.state.modalAdicionarItem}
          onHide={() => { this.setState({ modalAdicionarItem: false }) }}
          id_mesa={this.state._id}
          itemincluso={this.itemIncluso} />

        <DetalheMesaPagamento
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
              <ListGroupItem><b>Operador que abriu a mesa:</b> {this.state.nome_operador} </ListGroupItem>
              <ListGroupItem><b>Data e hora de abertura da mesa:</b> {this.dateFormat(this.state.data_abriu)} </ListGroupItem>
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" color="success" className="icon-arrow-left" onClick={() => this.setState({ modalInfosMesa: false })} > Voltar
            </Button>
          </Modal.Footer>
        </Modal >
      </div>
    );
  }
}

export default DetalheMesa;
