import React, { Component } from 'react';
import { Button, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Row, Col } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';
import Modal from 'react-bootstrap/Modal'
import SelectProduto from '../../components/SelectProduto';
import MaskedNumberInput from '../../components/MaskedNumberInput';

class DetalheMesa extends Component {

  constructor(props) {
    super(props);
    this.state = {
      codigo_produto: "",
      id_produto: "",
      quantidade: 1,
    };
  }

  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  incluirItem = async (event) => {
    event.preventDefault();

    let obj = {
      id_mesa: this.props.id_mesa,
      id_produto: this.state.codigo_produto[0],
      quantidade: parseInt(this.state.quantidade),
    }

    let dados = await serverRequest.request('/mesa/incluirItem', obj);

    if (dados) {
      this.setState({ modalAdicionarItem: false });
      this.props.onChange();
    }
  }

  decrementar() {
    if (this.state.quantidade > 1) {
      this.setState({ quantidade: parseInt(this.state.quantidade) - 1 })
    }
  }

  incrementar() {
    this.setState({ quantidade: parseInt(this.state.quantidade) + 1 })
  }



  render() {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop='static'
        {...this.props}>
        <form onSubmit={this.incluirItem}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Adicionar novo item a mesa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs={12} sm={7} md={8} lg={9}>
                <FormGroup>
                  <Label>Produto:</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="append">
                      <InputGroupText><i className="fa fa-list-ul"></i></InputGroupText>
                    </InputGroupAddon>
                    <SelectProduto
                      name="codigo_produto"
                      value={this.state.codigo_produto}
                      onChange={this.changeInput}
                      required />
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col xs={6} sm={5} md={4} lg={3}>
                <FormGroup>
                  <Label>Quantidade:</Label>
                  <InputGroup>
                    <InputGroupAddon onClick={this.decrementar.bind(this)} addonType="append" >
                      <InputGroupText><i className="fa fa-minus"></i></InputGroupText>
                    </InputGroupAddon>
                    <MaskedNumberInput
                      name="quantidade"
                      placeholder="Quantidade"
                      value={this.state.quantidade}
                      onChange={this.changeInput}
                      required />
                    <InputGroupAddon onClick={this.incrementar.bind(this)} addonType="append">
                      <InputGroupText><i className="fa fa-plus"></i></InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>

          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" color="success">Incluir</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

export default DetalheMesa;
