import React, { Component } from 'react';
import {
  Card, CardHeader, CardBody, Table, Button,
  FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText
} from 'reactstrap';
import MaskedMoneyInput from '../../components/MaskedMoneyInput';
import Modal from 'react-bootstrap/Modal';
import serverRequest from '../../utils/serverRequest';

class ListaLancamentos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalSangria: false,
      valor_sangria: "",
      modalSuprimento: false,
      valor_suprimento: "",
    };
  }

  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  incluirSangria = async (event) => {
    event.preventDefault();

    let obj = {
      id_caixa: this.props.id_caixa,
      valor: parseFloat(this.state.valor_sangria.replace(".", "").replace(",", "."))
    }

    let dados = await serverRequest.request('/caixa/sangria/incluir', obj);
    if (dados) {
      this.setState({ modalSangria: false, valor_sangria: "" })
      this.props.atualizou();
    }

  }

  incluirSuprimento = async (event) => {
    event.preventDefault();

    let obj = {
      id_caixa: this.props.id_caixa,
      valor: parseFloat(this.state.valor_suprimento.replace(".", "").replace(",", "."))
    }

    let dados = await serverRequest.request('/caixa/suprimento/incluir', obj);
    if (dados) {
      this.setState({ modalSuprimento: false, valor_suprimento: "" })
      this.props.atualizou();
    }

  }

  render() {
    const { saldo_inicial, data_abriu, sangrias, suprimentos } = this.props;
    let lancamentos = [{ data_incluiu: data_abriu || 0, descricao: "Saldo Inicial", valor: saldo_inicial }];
    if (sangrias)
      lancamentos = lancamentos.concat(sangrias.map(s => ({ descricao: "Sangria", ...s })))
    if (suprimentos)
      lancamentos = lancamentos.concat(suprimentos.map(s => ({ descricao: "Suprimentos", ...s })))

    return (
      <div>
        <Card>
          <CardHeader><i className='fa fa-money' />Lançamentos
            <div className="card-header-actions">
              <Button color="success" size="sm" className="mr-2" onClick={() => this.setState({ modalSuprimento: true })}>
                <i className="icon-plus mr-1"></i>Suprimento
              </Button>
              <Button color="danger" size="sm" onClick={() => this.setState({ modalSangria: true })}>
                <i className="icon-plus mr-1"></i>Sangria
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Tipo</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {
                  lancamentos.map((obj) => {
                    return (
                      <tr
                        key={obj.data_incluiu}
                        style={{ cursor: "pointer", textDecoration: obj.removido ? "line-through" : "none" }}>
                        <td>{new Date(obj.data_incluiu).toLocaleString()}</td>
                        <td>{obj.descricao}</td>
                        <td>R$ {parseFloat(obj.valor).toFixed(2)}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </Table>
          </CardBody>
        </Card>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop='static'
          show={this.state.modalSangria}
          onHide={() => this.setState({ modalSangria: false })}>
          <form onSubmit={this.incluirSangria}>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter" className="callout">Incluir Sangria</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormGroup>
                <Label>Valor:</Label>
                <InputGroup>
                  <InputGroupAddon addonType="append">
                    <InputGroupText>R$</InputGroupText>
                  </InputGroupAddon>
                  <MaskedMoneyInput
                    value={this.state.valor_sangria}
                    name="valor_sangria"
                    className="form-control"
                    onChange={this.changeInput}
                    placeholder="0,00"
                    required />
                </InputGroup>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" color="success">Incluir</Button>
            </Modal.Footer>
          </form>
        </Modal>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop='static'
          show={this.state.modalSuprimento}
          onHide={() => this.setState({ modalSuprimento: false })}>
          <form onSubmit={this.incluirSuprimento}>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter" className="callout">Incluir Suprimento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormGroup>
                <Label>Valor:</Label>
                <InputGroup>
                  <InputGroupAddon addonType="append">
                    <InputGroupText>R$</InputGroupText>
                  </InputGroupAddon>
                  <MaskedMoneyInput
                    value={this.state.valor_suprimento}
                    name="valor_suprimento"
                    className="form-control"
                    onChange={this.changeInput}
                    placeholder="0,00"
                    required />
                </InputGroup>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" color="success">Incluir</Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    )
  }
}

export default ListaLancamentos;