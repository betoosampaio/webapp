import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import Modal from 'react-bootstrap/Modal'
import Confirm from 'reactstrap-confirm';
import serverRequest from '../../utils/serverRequest';


class DetalhePagamentoItem extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };

  }

  onHide = () => {
    this.props.onHide();
  }

  moneyFormat = (preco) => {
    if (preco)
      return `R$ ${preco.toFixed(2)}`;
    else
      return preco;
  }

  dateFormat = (data) => {
    let dataRetornar = new Date(data).toLocaleString();
    return dataRetornar;

  }

  removerItem = async (id_mesa, id_pagamento) => {
    let confirm = await Confirm({
      title: "Confirmação",
      message: "Tem certeza que deseja remover esse pagamento?",
      confirmColor: "success",
      confirmText: "Confirmar",
      cancelColor: "danger",
      cancelText: "Cancelar",
    });

    if (confirm) {
      let dados = await serverRequest.request('/mesa/pagamento/remover', { "id_mesa": id_mesa, "id_pagamento": id_pagamento });
      if (dados) {
        this.onHide();
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
        
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="callout">Detalhes do pagamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroupItem><b>Valor pago:</b> {this.moneyFormat(item.valor)}</ListGroupItem>
            <ListGroupItem><b>Forma de pagamento:</b> {item.ds_forma_pagamento}</ListGroupItem>
            <ListGroupItem><b>Data do pagamento:</b> {this.dateFormat(item.data_incluiu)}</ListGroupItem>
            <ListGroupItem><b>Operador:</b> {item.nome_operador}</ListGroupItem>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>

          <Button variant="primary" color="danger" className="icon-close" onClick={() => this.removerItem(this.props.id_mesa, item.id_pagamento)} > Excluir pagamento</Button>

        </Modal.Footer>

      </Modal >
    );
  }
}

export default DetalhePagamentoItem;