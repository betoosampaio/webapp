import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import Modal from 'react-bootstrap/Modal'
import Foto from '../../components/Foto';
import Confirm from 'reactstrap-confirm';
import serverRequest from '../../utils/serverRequest';


class DetalheMNesaItem extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };

  }

  moneyFormat = (preco) => {
    if (preco)
      return `R$ ${preco.toFixed(2)}`;
    else
      return preco;
  }

  onHide = () => {
    this.props.onHide();
  }

  dateFormat = (data) => {
    let dataRetornar = new Date(data).toLocaleString();
  return dataRetornar;
  
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
    const item = this.props.item || {}



    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop='static'
        show={this.props.show}
        onHide={this.onHide}
        onBlur={this.moneyFormat}>

        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="callout">Detalhes deste item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroupItem> <Foto src={item.imagem} height="50" width="50"></Foto> </ListGroupItem>
            <ListGroupItem><b>Código Produto:</b> {item.codigo_produto}</ListGroupItem>
            <ListGroupItem><b>Nome Produto:</b> {item.nome_produto}</ListGroupItem>
            <ListGroupItem><b>Quantidade:</b> {item.quantidade}</ListGroupItem>
            <ListGroupItem><b>Valor total:</b> {this.moneyFormat(item.preco * item.quantidade)} </ListGroupItem>

            <ListGroupItem><b>Data e hora de inserção do produto:</b> {this.dateFormat(item.data_inclusao)}</ListGroupItem>

            <ListGroupItem><b>Operador que inseriu o produto:</b> {item.id_operador_abertura}</ListGroupItem>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>

          <Button variant="primary" color="danger" onClick={() => this.removerItem(this.props.id_mesa, item.id_item)}
            className="icon-close"> Excluir produto
            </Button>

        </Modal.Footer>

      </Modal >
    );
  }
}

export default DetalheMNesaItem;