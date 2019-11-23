import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import Modal from 'react-bootstrap/Modal'
import Confirm from 'reactstrap-confirm';
import serverRequest from '../../utils/serverRequest';


class DetalheLancamento extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onHide = () => {
    this.props.onHide();
  }

  remover = async (lancamento) => {
    let confirm = await Confirm({
      title: "Confirmação",
      message: "Tem certeza que deseja remover esse lançamento?",
      confirmColor: "success",
      confirmText: "Confirmar",
      cancelColor: "danger",
      cancelText: "Cancelar",
    });
    if (confirm) {
      let obj = {
        id_caixa: this.props.id_caixa,
        id_sangria: lancamento.id_sangria,
        id_suprimento: lancamento.id_suprimento,
      }
      let dados = await serverRequest.request(`/caixa/${lancamento.descricao}/remover`, obj);
      if (dados) {
        this.onHide();
        this.props.atualizou();
      }
    }
  }


  render() {
    const lancamento = this.props.lancamento || {}

    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop='static'
        show={this.props.show}
        onHide={this.onHide}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="callout">Detalhes do lançamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroupItem><b>Valor:</b> R${parseFloat(lancamento.valor).toFixed(2)}</ListGroupItem>
            <ListGroupItem><b>Tipo:</b> {lancamento.descricao}</ListGroupItem>
            <ListGroupItem><b>Data:</b> {new Date(lancamento.data_incluiu).toLocaleString()}</ListGroupItem>
            <ListGroupItem><b>Operador:</b> {lancamento.nome_operador}</ListGroupItem>
            { lancamento.removido &&
              <ListGroupItem><b>Removido:</b> {new Date(lancamento.data_removeu).toLocaleString()}</ListGroupItem>
              }
          </ListGroup>
        </Modal.Body>
        {
          this.props.id_status == 1 && lancamento.descricao !== "Saldo Inicial" &&
          <Modal.Footer>
            <Button variant="primary" color="danger" className="icon-close" onClick={() => this.remover(lancamento)}> Excluir</Button>
          </Modal.Footer>
        }
      </Modal >
    );
  }
}

export default DetalheLancamento;