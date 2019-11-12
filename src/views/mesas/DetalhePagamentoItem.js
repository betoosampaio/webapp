import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import Modal from 'react-bootstrap/Modal'
import Foto from '../../components/Foto';
import Confirm from 'reactstrap-confirm';
import serverRequest from '../../utils/serverRequest';


class DetalhePagamentoItem extends Component {

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

  dateFormat = (data) => {
    let dataRetornar = new Date(data).toLocaleString();
  return dataRetornar;
  
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
        onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="callout">Detalhes do pagamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>


            <ListGroupItem><b>Valor Pago:</b> {this.moneyFormat(item.valor)}</ListGroupItem>
            <ListGroupItem><b>Forma de pagamento:</b> {item.ds_forma_pagamento}</ListGroupItem>
            <ListGroupItem><b>Horário Pagamento:</b> {this.dateFormat(item.data_inclusao)}</ListGroupItem>
            <ListGroupItem><b>Operador:</b> {item.nome_operador}</ListGroupItem>


          </ListGroup>
        </Modal.Body>
        <Modal.Footer>

          <Button variant="primary" color="danger" className="icon-close">
            Excluir produto
            </Button>

        </Modal.Footer>

      </Modal >
    );
  }
}

export default DetalhePagamentoItem;