import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, Table, } from 'reactstrap';
import FotoProduto from '../../components/FotoProduto';
import Confirm from 'reactstrap-confirm';
import DetalheItem from './DetalheItem';
import FechamentoMesa from './FechamentoMesa';
import serverRequest from '../../utils/serverRequest';

class ListaItems extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  moneyFormat = (valor) => {
    if (valor)
      return `R$ ${valor.toFixed(2)}`;
    else
      return valor;
  }

  removerItem = async (id_mesa, id_item) => {
    let confirm = await Confirm({
      title: "Confirmação",
      message: "Tem certeza que deseja remover esse item ?",
      confirmColor: "success",
      confirmText: "Confirmar",
      cancelColor: "danger",
      cancelText: "Cancelar",
    });

    if (confirm) {
      let dados = await serverRequest.request('/mesa/item/remover', { "id_mesa": id_mesa, "id_item": id_item });
      if (dados) {
        this.props.atualizou();
      }

    }
  }

  render() {
    const { produtos, qtdProdutos, vlrProdutos, novoProduto, id_mesa, aberta } = this.props;
    return (
      <Card>
        <CardHeader>
          <i className='fa fa-cutlery'></i>Produtos
          {aberta &&
            <Button onClick={novoProduto} className="pull-right" color="success" size="sm">
              <i className="icon-plus mr-1"></i>Incluir
                </Button>
          }
        </CardHeader>
        <CardBody>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {
                produtos.map((obj) => {
                  return (
                    <tr
                      onClick={() => this.setState({ modalDetalheMesaItem: true, detalheItemSelecionado: obj })}
                      key={obj.data_incluiu}
                      style={{ cursor: "pointer", textDecoration: obj.removido ? "line-through" : "none" }}>
                      <td><FotoProduto src={obj.imagem} height="30" width="30"></FotoProduto></td>
                      <td>{obj.nome_produto}</td>
                      <td>{obj.quantidade}</td>
                      <td>{this.moneyFormat(obj.preco * obj.quantidade)}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </Table>
        </CardBody>
        <CardFooter>
          <b>{qtdProdutos} items</b>
          <b className="pull-right">Valor total: {this.moneyFormat(vlrProdutos)}</b>


        </CardFooter>
        <DetalheItem
          show={this.state.modalDetalheMesaItem}
          onHide={() => { this.setState({ modalDetalheMesaItem: false }) }}
          item={this.state.detalheItemSelecionado}
          id_mesa={id_mesa}
          atualizou={this.props.atualizou}
          aberta={this.props.aberta}
         
        />
        <FechamentoMesa
          show={this.state.modalFechamentoMesa}
          onHide={() => { this.setState({ modalFechamentoMesa: false }) }}
          item={this.state.detalheItemSelecionado}
          id_mesa={id_mesa}
          atualizou={this.props.atualizou}
        />

      </Card>
    )
  }
}

export default ListaItems;