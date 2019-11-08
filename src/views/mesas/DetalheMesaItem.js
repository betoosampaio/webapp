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

  moneyFormat = (valor) => {
    if (valor)
      return `R$ ${valor.toFixed(2)}`;
    else
      return valor;
  }

  onHide = () => {
    this.props.onHide();
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
          onHide={this.onHide}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" className="callout">Detalhes deste produto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              <ListGroupItem> <Foto src={item.imagem} height="50" width="50"></Foto> </ListGroupItem>
              <ListGroupItem><b>Código Produto:</b> {item.codigo_produto}</ListGroupItem>
              <ListGroupItem><b>Nome Produto:</b> {item.nome_produto}</ListGroupItem>
              <ListGroupItem><b>Quantidade:</b> {item.quantidade}</ListGroupItem>
              <ListGroupItem><b>Valor:</b> R$ {item.preco} </ListGroupItem>
              <ListGroupItem><b>Data e hora de abertura da mesa:</b> {item.data_inclusao}</ListGroupItem>
              <ListGroupItem><b>Operador que abriu a mesa:</b> {item.id_operador_abertura}</ListGroupItem>
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>

            <Button color="danger" size="sm" onClick={() => this.removerItem(this.props.id_mesa, item.id_item)} >
              <i className="icon-close"> Excluir produto</i>
            </Button>

          </Modal.Footer>

        </Modal >
      );
  }
}

export default DetalheMNesaItem;