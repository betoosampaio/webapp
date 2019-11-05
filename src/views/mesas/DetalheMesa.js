import React, { Component } from 'react';
import {
  Table, Card, CardHeader, CardBody, CardFooter, Button, Row, Col, ListGroup,
  ListGroupItem, ButtonGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import serverRequest from '../../utils/serverRequest';
import Confirm from 'reactstrap-confirm';
import IncluirItem from './IncluirItem';
import Foto from '../../components/Foto';

class DetalheMesa extends Component {

  constructor(props) {
    super(props);
    this.state = {
      produtos: [],
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
    return `R$ ${vl.toFixed(2)}`;
  }

  qtdProdutos = () => {
    let qt = 0;
    qt = this.state.produtos.reduce((sum, key) =>
      sum + (key.removido ? 0 : parseInt(key.quantidade)), 0)
    return qt;
  }

  vlrServicos = () => {
    let
      txservico = parseFloat(this.state.taxa_servico) || 0,
      desconto = parseFloat(this.state.desconto) || 0;
    return `R$ ${(txservico - desconto).toFixed(2)}`;
  }

  vlrTxServico = () => { return `R$ ${(parseFloat(this.state.taxa_servico) || 0).toFixed(2)}` }
  vlrDesconto = () => { return `R$ -${(parseFloat(this.state.desconto) || 0).toFixed(2)}` }

  vlrTotal = () => {
    let
      vl = 0,
      txservico = parseFloat(this.state.taxa_servico) || 0,
      desconto = parseFloat(this.state.desconto) || 0;

    vl = this.state.produtos.reduce((sum, key) =>
      sum + (key.removido ? 0 : key.preco * key.quantidade), 0)
    return `R$ ${(vl + txservico - desconto).toFixed(2)}`;
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
                  title="Remover">
                  <i className="icon-ban" />
                </Button>
                <Button
                  className="pull-right bg-success mr-1"
                  onClick={() => this.fecharMesa(this.state._id)}
                  size="sm"
                  title="Encerrar">
                  <i className="icon-basket-loaded" />
                </Button>
                <div className="text-value">{this.state.aberta ? "Aberta" : "Fechada"}</div>
                <div>Situação</div>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-success">
              <CardBody>
                <div className="text-value">{this.vlrTotal()}</div>
                <div>Valor Total</div>
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
                            <td>{`R$ ${(obj.preco * obj.quantidade).toFixed(2).replace('.', ',')}`}</td>
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
                <b className="pull-right">{this.vlrProdutos()}</b>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} md={4} lg={5}>

            <Card>
              <CardHeader><i className='icon-calculator'></i>Resumo
              </CardHeader>
              <CardBody>
                <ListGroup>
                  <ListGroupItem><i className="fa fa-wrench mr-2 text-muted" />Taxa de Serviço
                    <Button size="sm" className="pull-right">{this.vlrTxServico()}</Button>
                  </ListGroupItem>
                  <ListGroupItem><i className="fa fa-dollar mr-2 text-muted" />Desconto
                    <Button size="sm" className="pull-right">{this.vlrDesconto()}</Button>
                  </ListGroupItem>
                  <ListGroupItem><i className="fa fa-cutlery mr-2 text-muted" />Produtos
                    <span className="pull-right">{this.vlrProdutos()}</span>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
              <CardFooter>
                <b>Total</b>
                <b className="pull-right">{this.vlrTotal()}</b>
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
                    <tr>
                      <td>Dinheiro</td>
                      <td>R$ 50,00</td>
                      <td><Button color="danger" size="sm"><i className="icon-close"></i></Button></td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>
                <b>Total</b>
                <b className="pull-right">R$ 50,00</b>
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
