import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import Modal from 'react-bootstrap/Modal'

class DetalheMNesaItem extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };

  }

  onHide = () => {
    this.props.onHide();
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
          <Modal.Title id="contained-modal-title-vcenter">Detalhes deste produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroupItem><b>Código Produto:</b> {item.codigo_produto}</ListGroupItem>
            <ListGroupItem><b>Nome Produto:</b> {item.nome_produto}</ListGroupItem>
            <ListGroupItem><b>Preço:</b> {item.preco}</ListGroupItem>
            <ListGroupItem><b>Imagem:</b> {item.imagem} </ListGroupItem>
            <ListGroupItem><b>Data e hora de abertura da mesa:</b> {item.data_abertura}</ListGroupItem>
          </ListGroup>




        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" color="success"><i className="fa fa-check"></i> Incluir</Button>
        </Modal.Footer>

      </Modal >
    );
  }
}

export default DetalheMNesaItem;