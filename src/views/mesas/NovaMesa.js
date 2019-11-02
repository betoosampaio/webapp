import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';
import Modal from 'react-bootstrap/Modal'

class NovaMesa extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numero: "",
    };
  }

  cadastrar = async (event) => {
    event.preventDefault();
    let obj = {
      numero: this.state.numero,
    }

    let dados = await serverRequest.request('/mesa/cadastrar', obj);
    if (dados) {
      this.setState({ numero: "" });
      this.props.mesaadicionada();
    }
  }

  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
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
        <form name="form" onSubmit={this.cadastrar}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Iniciar Mesa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <Label>Número da mesa:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-id-card"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="numero" value={this.state.numero} onChange={this.changeInput} />
              </InputGroup>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" color="success"><i className="fa fa-check"></i> Incluir</Button>
          </Modal.Footer>
        </form>
      </Modal >
    );
  }
}

export default NovaMesa;
