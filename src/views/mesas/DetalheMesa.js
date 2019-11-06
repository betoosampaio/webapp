import React, { Component } from 'react';
import {
  Table, Card, CardHeader, CardBody, CardFooter, Button, Input, Row, Col, ListGroup,
  ListGroupItem, InputGroup, InputGroupAddon, InputGroupText,
} from 'reactstrap';
import serverRequest from '../../utils/serverRequest';
import Confirm from 'reactstrap-confirm';
import IncluirItem from './IncluirItem';
import Foto from '../../components/Foto';
import MaskedMoneyInput from '../../components/MaskedMoneyInput';

class DetalheMesa extends Component {

  constructor(props) {
    super(props);
    this.state = {
      servicoPorcentagem: '',
      descontoPorcentagem: '',
      servico: '',
      desconto: '',
      txServicoVisivel: false,
      descontoVisivel: false,
      showEditarDesconto: false,
      showEditarTaxaServico: false,
      produtos: [],
      pagamentos: [],
      id_mesa: "",
    };
  }

  componentDidMount() {
    this.obter(this.props.match.params.id);
  }

  componentDidUpdate() {

    let valorTotal = this.vlrProdutos();

    if (valorTotal !== this.state.valorTotal) {
      this.setState({ valorTotal: valorTotal });
    }

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
  c
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
      message: "Tem certeza que quer cancelar essa conta?",
      confirmColor: "danger",
      confirmText: "Sim",
      cancelText: "Não",
    });

    if (confirm) {
      let dados = await serverRequest.request('/mesa/remover', { "id_mesa": id_mesa });
      if (dados) {
        window.location.href = '/#/mesas'
      }

    }
  }

  removerItem = async (id_mesa, id_item) => {
    let confirm = await Confirm({
      title: "Confirmação",
      message: "Tem certeza que quer remover esse item ?",
      confirmColor: "danger",
      confirmText: "Sim",
      cancelText: "Não",
    });

    if (confirm) {
      let dados = await serverRequest.request('/mesa/item/remover', { "id_mesa": id_mesa, "id_item": id_item });
      if (dados) {
        this.obter(this.props.match.params.id);
      }

    }
  }

  fecharMesa = async (id_mesa) => {
    let confirm = await Confirm({
      title: "Confirmação",
      message: "Tem certeza que quer encerrar essa conta?",
      confirmColor: "success",
      confirmText: "Sim",
      cancelText: "Não",
    });

    if (confirm) {
      let dados = await serverRequest.request('/mesa/fechar', { "id_mesa": id_mesa });
      if (dados) {
        window.location.href = '/#/mesas'
      }
    }
  }

  changeInputDesconto = (event) => {
    if (event.target.name === "desconto") {

      let porcentagem = event.target.value * 100 / this.state.valorTotal;


      this.setState({ desconto: event.target.value, descontoPorcentagem: porcentagem });

    } else {

      let evento = event.target.value.replace(',', '');

      let valor = (evento * this.state.valorTotal) / 100;

      this.setState({ descontoPorcentagem: event.target.value, desconto: valor });
    }

  }
  changeInputServico = (event) => {
    if (event.target.name === "servico") {

      let porcentagem = event.target.value * 100 / this.state.valorTotal;

      this.setState({ servico: event.target.value, servicoPorcentagem: porcentagem });

    } else {
      let valor = (event.target.value * this.state.valorTotal) / 100;

      this.setState({ servicoPorcentagem: event.target.value, servico: valor });
    }

  }

  adicionarDesconto = async (id_mesa, desconto) => {

    let obj = {
      desconto: parseInt(this.state.desconto),
      id_mesa: this.state._id,
    }

    let dados = await serverRequest.request('/mesa/editarDesconto', obj);
    if (dados) {
      window.parent.location.reload();

    }
  }

  render() {
    return (
      <div>


        <h2 className="mb-4">Mesa {this.state.numero}</h2>


        <Row>

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
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>


          <Col xs="12" sm="6" lg="4">
            <Card>
              <CardBody>
                <Button
                  className="pull-right bg-danger"
                  onClick={() => this.removerMesa(this.state._id)}
                  size="sm"
                  title="Remover">
                  <i className="icon-ban" />
                </Button>
                <Button
                  className="pull-right bg-primary mr-1"
                  onClick={() => this.fecharMesa(this.state._id)}
                  size="sm"
                  title="Encerrar">
                  <i className="icon-basket-loaded" />
                </Button>
                <Button
                  className="pull-right bg-success mr-1"
                  size="sm"
                  title="Novo Pagamento">
                  <i className="fa fa-money" />
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

        </Row>



        <Row>

          <Col xs={12} md={8} lg={7}>
            <Card>
              <CardHeader>
                <i className='fa fa-cutlery'></i>Produtos
                <Button onClick={() => this.setState({ modalAdicionarItem: true })} className="pull-right" color="success" size="sm">
                  <i className="icon-plus"></i>&nbsp;Incluir
                </Button>
              </CardHeader>
              <CardBody>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Imagem</th>
                      <th>Produto</th>
                      <th>Quantidade</th>
                      <th>Valor</th>
                      <th>Excluir</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.produtos.map((obj) => {
                        return (
                          <tr key={obj.data_inclusao} style={{ textDecoration: obj.removido ? "line-through" : "none" }}>
                            <td><Foto src={obj.imagem} height="30" width="30"></Foto></td>
                            <td>{obj.nome_produto}</td>
                            <td>{obj.quantidade}</td>
                            <td>{this.moneyFormat(obj.preco * obj.quantidade)}</td>
                            <td>
                              {obj.removido
                                ? null
                                : <Button color="danger" size="sm" onClick={() => this.removerItem(this.state._id, obj.id_item)} >
                                  <i className="icon-close"></i>
                                </Button>
                              }
                            </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>
                <b>{this.qtdProdutos()} items</b>
                <b className="pull-right">{this.moneyFormat(this.vlrProdutos())}</b>
              </CardFooter>
            </Card>
          </Col>

          <Col xs={12} md={4} lg={5}>

            <Card>
              <CardHeader><i className='icon-calculator'></i>Resumo
              </CardHeader>
              <CardBody>
                <ListGroup>

                  <ListGroupItem>
                    <i className="fa fa-cutlery mr-2 text-muted" />Produtos
                  <Button
                      className="pull-right bg-white"
                      onClick={() => this.setState({ modalAdicionarItem: true })}>
                      {this.moneyFormat(this.vlrProdutos())}
                    </Button>
                  </ListGroupItem>

                  <ListGroupItem><i className="fa fa-wrench mr-2 text-muted" />Taxa de Serviço
                  <Button
                      className="pull-right bg-white"
                      onClick={() => this.setState({ txServicoVisivel: !this.state.txServicoVisivel })}>
                      {this.moneyFormat(this.vlrTxServico())}
                    </Button>
                    {
                      this.state.txServicoVisivel
                        ? <Row className="mt-4">
                          <Col xs="5">
                            <InputGroup>
                              <InputGroupAddon addonType="append">
                                <InputGroupText>R$</InputGroupText>
                              </InputGroupAddon>
                              <MaskedMoneyInput
                                name="servico"
                                value={this.state.servico}
                                onChange={this.changeInputServico}
                                placeholder="Tx Serviço"
                              />
                            </InputGroup>
                          </Col>
                          <Col xs="5">
                            <InputGroup>
                              <InputGroupAddon addonType="append">
                                <InputGroupText>%</InputGroupText>
                              </InputGroupAddon>
                              <Input
                                name="servicoPorcentagem"
                                value={this.state.servicoPorcentagem}
                                onChange={this.changeInputServico}
                                placeholder="% Serviço"
                              />
                            </InputGroup>
                          </Col>
                          <Col xs="2">
                            <Button>OK</Button>
                          </Col>
                        </Row>
                        : null
                    }
                  </ListGroupItem>

                  <ListGroupItem><i className="fa fa-dollar mr-2 text-muted" />Desconto
                  <Button
                      className="pull-right bg-white"
                      onClick={() => this.setState({ descontoVisivel: !this.state.descontoVisivel })}>
                      {this.moneyFormat(this.vlrDesconto())}
                    </Button>
                    {this.state.descontoVisivel
                      ? <Row className="mt-4">
                        <Col xs="5">
                          <InputGroup>
                            <InputGroupAddon addonType="append">
                              <InputGroupText>R$</InputGroupText>
                            </InputGroupAddon>
                            <MaskedMoneyInput
                              name="desconto"
                              value={this.state.desconto}
                              onChange={this.changeInputDesconto}
                              placeholder="Desconto"
                            />
                          </InputGroup>
                        </Col>
                        <Col xs="5">
                          <InputGroup>
                            <InputGroupAddon addonType="append">
                              <InputGroupText>%</InputGroupText>
                            </InputGroupAddon>
                            <Input
                              name="descontoPorcentagem"
                              value={this.state.descontoPorcentagem}
                              onChange={this.changeInputDesconto}
                              placeholder="% Desconto"
                            />
                          </InputGroup>
                        </Col>
                        <Col xs="2"><Button>OK</Button></Col>
                      </Row>
                      : null
                    }
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
              <CardFooter>
                <b>Total</b>
                <b className="pull-right">{this.moneyFormat(this.vlrTotal())}</b>
              </CardFooter>
            </Card>
            <Card>

              <CardHeader><i className='fa fa-money'></i>
                Pagamentos
                <Button className="pull-right" color="success" size="sm">
                  <i className="icon-plus"></i>&nbsp;Incluir
                </Button>
              </CardHeader>
              <CardBody>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Forma</th>
                      <th>Valor</th>
                      <th>Excluir</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.pagamentos.map((obj) => {
                        return (
                          <tr key={obj.data_inclusao} style={{ textDecoration: obj.removido ? "line-through" : "none" }}>
                            <td>{obj.ds_forma_pagamento}</td>
                            <td>{this.moneyFormat(obj.valor)}</td>
                            <td>
                              {obj.removido
                                ? null
                                : <Button color="danger" size="sm">
                                  <i className="icon-close"></i>
                                </Button>
                              }
                            </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>
                <b>Total</b>
                <b className="pull-right">{this.moneyFormat(this.vlrPagamentos())}</b>
              </CardFooter>
            </Card>
          </Col>


        </Row>


        <IncluirItem
          show={this.state.modalAdicionarItem}
          onHide={() => { this.setState({ modalAdicionarItem: false }) }}
          id_mesa={this.state._id}
          itemincluso={this.itemIncluso} />
      </div >
    );
  }
}

export default DetalheMesa;
