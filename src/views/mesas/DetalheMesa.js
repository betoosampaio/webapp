import React, { Component } from 'react';
import { Table, Card, CardHeader, CardBody, CardFooter, Button } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';
import Confirm from 'reactstrap-confirm';
import IncluirItem from './IncluirItem';

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
      let dados = await serverRequest.request('/mesa/removerItem', { "id_mesa": id_mesa, "id_item": id_item });
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
        <h2>Mesa {this.state.numero}</h2>
        <Card className="mt-4">
          <CardHeader>
            <i className='icon-list'></i>&nbsp; Produtos
                        <div className="card-header-actions">
              <Button onClick={() => this.setState({ modalAdicionarItem: true })} color="success" size="sm">
                <i className="icon-plus"></i>&nbsp;Incluir</Button>
            </div>
          </CardHeader>
          <CardBody>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
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
              <tfoot>
                <tr>
                  <th>Total</th>
                  <th>{this.qtdProdutos()}</th>
                  <th colSpan="2">{this.vlrProdutos()}</th>
                </tr>
              </tfoot>
            </Table>
          </CardBody>
          <CardFooter>
            <Button className="pull-right" color="success" onClick={() => this.fecharMesa(this.state._id)}><i className="icon-check"></i> Encerrar Conta</Button>
            <Button title="Cancelar Conta" className="pull-right mr-2" color="danger" onClick={() => this.removerMesa(this.state._id)} ><i className="icon-ban"></i></Button>
          </CardFooter>
        </Card>
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
