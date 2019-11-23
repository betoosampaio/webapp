import React, { Component } from 'react';
import { Button, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Table } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';
import Modal from 'react-bootstrap/Modal'
import MaskedMoneyInput from '../../components/MaskedMoneyInput';
import SelectFormasPagamento from '../../components/SelectFormasPagamento';
import SelectCaixasAbertos from '../../components/SelectCaixasAbertos';


class IncluirPagamento extends Component {

  constructor(props) {
    super(props);
    this.state = {
      valor: '',
      id_forma_pagamento: '',
      ds_forma_pagamento: '',
      lista: [],
      selecionados: [],

      validacao: {
        valor: { valid: false, invalid: false, msg: '' },
        id_forma_pagamento: { valid: false, invalid: false, msg: '' },
        ds_forma_pagamento: { valid: false, invalid: false, msg: '' },
      }
    };
  }

  componentDidMount() {
    this.obterDados();
  }

  obterDados = async () => {
    let dados = await serverRequest.request('/obterFormasPagamento');
    if (dados) {
      this.setState({ lista: dados });
    }
  }

  confirmar = async () => {

    if (this.state.selecionados.length > 0) {

      let pagamentos = this.state.selecionados.map(p => ({
        id_forma_pagamento: p.id_forma_pagamento,
        id_caixa: p.id_caixa,
        valor: parseFloat(p.valor.replace('.', '').replace(',', '.'))
      }))

      let obj = {
        id_mesa: this.props.id_mesa,
        pagamentos: pagamentos,
      }
      let dados = await serverRequest.request('/mesa/pagamento/incluir', obj);
      if (dados) {
        this.setState({
          valor: '',
          id_forma_pagamento: '',
          ds_forma_pagamento: '',
          selecionados: [],
        })
        this.props.pagamentoincluso();
      }
    }
  }

  remover(id) {
    let selecionados = Object.assign([], this.state.selecionados);
    selecionados = selecionados.filter(p => p.id !== id);
    this.setState({ selecionados: selecionados })
  }

  incluir = (event) => {
    event.preventDefault();

    let formaPagamento = this.state.lista.find(fm => String(fm.id_forma_pagamento) === this.state.id_forma_pagamento);

    let selecionado = {
      id_forma_pagamento: this.state.id_forma_pagamento,
      valor: this.state.valor,
      ds_forma_pagamento: formaPagamento.ds_forma_pagamento,
      id_caixa: this.state.id_caixa,
      numero_caixa: this.state.numero_caixa,
    }
    selecionado.id = this.state.selecionados.reduce((prev, cur) => (prev.id > cur.id) ? prev.id : cur.id, 0) + 1;

    this.setState({
      selecionados: [...this.state.selecionados, selecionado],
      id_forma_pagamento: "",
      valor: "",
    });
  }


  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  changeInputCaixa = (event) => {
    const { value, options, selectedIndex } = event.target;
    this.setState({ id_caixa: value, numero_caixa: options[selectedIndex].text });
  }

  selecionarCaixa = (id_caixa, numero_caixa) => {
    this.setState({ id_caixa: id_caixa, numero_caixa: numero_caixa });
  }

  render() {

    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop='static'
        show={this.props.show}
        onHide={this.props.onHide}>

        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Adicionar Pagamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form onSubmit={this.incluir} >
            <FormGroup>
              <Label>Valor:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className='fa fa-money'></i></InputGroupText>
                </InputGroupAddon>

                <MaskedMoneyInput
                  placeholder="Digite aqui o valor"
                  name="valor"
                  value={this.state.valor}
                  onChange={this.changeInput}
                  autoComplete="off"
                  required
                />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Forma de Pagamento:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className='fa fa-money'></i></InputGroupText>
                </InputGroupAddon>

                <SelectFormasPagamento
                  name="id_forma_pagamento"
                  value={this.state.id_forma_pagamento}
                  onChange={this.changeInput}
                  required />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Caixa:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className='icon-calculator'></i></InputGroupText>
                </InputGroupAddon>

                <SelectCaixasAbertos
                  name="id_caixa"
                  value={this.state.id_caixa}
                  onChange={this.changeInputCaixa}
                  selecionar={this.selecionarCaixa}
                  required />
                <Button className="ml-2" color="success" type="submit">Incluir</Button>
              </InputGroup>
            </FormGroup>


          </form>
          <Table striped bordered hover responsive>
            <thead className="thead-light">
              <tr>

                <th>Valor</th>
                <th>Forma de Pagamento</th>
                <th>Caixa</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody>
              {this.state.selecionados.map(obj => {
                return (
                  <tr key={obj.id}>

                    <td>{obj.valor}</td>
                    <td>{obj.ds_forma_pagamento}</td>
                    <td>{obj.numero_caixa}</td>
                    <td>
                      <Button color="danger" size="sm" onClick={() => this.remover(obj.id)} >
                        <i className="icon-close"></i>
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>

          <Button color="success" onClick={() => this.confirmar()} >Confirmar</Button>

        </Modal.Footer>

      </Modal >
    );
  }
}

export default IncluirPagamento;
