import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';
import Modal from 'react-bootstrap/Modal';
import MaskedMoneyInput from '../../components/MaskedMoneyInput';

class IncluirCaixa extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numero: "",
      saldo_inicial: "0,00",
    };
  }

  abrir = async (event) => {
    event.preventDefault();

    let obj = {
      numero: this.state.numero,
      saldo_inicial: parseFloat(this.state.saldo_inicial.replace('.', '').replace(',', '.'))
    }

    let dados = await serverRequest.request('/caixa/abrir', obj);
    if (dados) {
      this.setState({ numero: "", saldo_inicial: "0,00" });
      this.props.caixaadicionado();
    }
  }

  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onHide = () => {
    this.setState({ numero: "", saldo_inicial: "0,00" });
    this.props.onHide();
  }

  render() {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop='static'
        show={this.props.show}
        onHide={this.onHide}>
        <form name="form" onSubmit={this.abrir}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Abrir Caixa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <Label>Número do caixa:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-id-card"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="numero" value={this.state.numero} onChange={this.changeInput} required/>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Saldo Inicial:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText>R$</InputGroupText>
                </InputGroupAddon>
                <MaskedMoneyInput
                  value={this.state.saldo_inicial}
                  name="saldo_inicial"
                  className="form-control"
                  onChange={this.changeInput}
                  placeholder="0,00"
                  required/>
              </InputGroup>
            </FormGroup>

          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" color="success"><i className="fa fa-check"></i> Abrir</Button>
          </Modal.Footer>
        </form>
      </Modal >
    );
  }
}

export default IncluirCaixa;
