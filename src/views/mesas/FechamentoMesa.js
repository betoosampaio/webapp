import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Modal from 'react-bootstrap/Modal'
import ResumoMesa from './ResumoMesa';
import serverRequest from '../../utils/serverRequest';

class FechamentoMesa extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  moneyFormat = (preco) => {
    try {
      return `R$ ${preco.toFixed(2)}`;
    }
    catch{
      return preco;
    }
  }

  onHide = () => {
    this.props.onHide();
  }

  dateFormat = (data) => {
    let dataRetornar = new Date(data).toLocaleString();
    return dataRetornar;
  }

  fecharMesa = async (id_mesa) => {
    let dados = await serverRequest.request('/mesa/fechar', { "id_mesa": id_mesa });
    if (dados) {
      this.props.atualizou();
      this.onHide();
    }
  }

  render() {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop='static'
        show={this.props.show}
        onHide={this.props.onHide}
        onBlur={this.moneyFormat}>

        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="callout">Resumo do fechamento da mesa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ResumoMesa
            vlrProdutos={this.props.vlrProdutos}
            vlrTxServico={this.props.vlrTxServico}
            vlrDesconto={this.props.desconto}
            vlrTotal={this.props.vlrTotal}
            desconto={this.props.desconto}
            taxa_servico={this.props.taxa_servico}
            id_mesa={this.props.id_mesa}
            atualizou={this.props.atualizou} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary"
            className="mr-auto fa fa-print"> Imprimir
            </Button>

          <Button variant="primary" color="danger" onClick={this.onHide}
            className="icon-close"> Cancelar
            </Button>

          <Button variant="primary" color="success" onClick={() => this.fecharMesa(this.props.id_mesa)}
            className="icon-check"> Confirmar
            </Button>
        </Modal.Footer>
      </Modal >
    );
  }
}

export default FechamentoMesa;