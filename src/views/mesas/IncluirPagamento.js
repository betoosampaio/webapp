import React, { Component } from 'react';
import { Button, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Table } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';
import Modal from 'react-bootstrap/Modal'
import MaskedMoneyInput from '../../components/MaskedMoneyInput';
import SelectFormasPagamento from '../../components/SelectFormasPagamento';


class IncluirPagamento extends Component {

  constructor(props) {
    super(props);
    this.state = {
      valor: '',
      id_forma_pagamento: '',
      ds_forma_pagamento: '',
      nome_operador: '',
      lista: [],
      selecionados: [],

      validacao: {
        valor: { valid: false, invalid: false, msg: '' },
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

  incluirPagamento = async (event) => {
    event.preventDefault();

    
    if (this.state.selecionados.length > 0) {

      let pagamentos = this.state.selecionados.map(p => ({ id_forma_pagamento: p.id_forma_pagamento, valor: parseFloat(p.valor.replace('.', '').replace(',', '.')) }))

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
          nome_operador: '',
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

  SelecionarFormaDePagamento = (event) => {
    let formaPagamento = this.state.lista.find(fm => String(fm.id_forma_pagamento) === this.state.id_forma_pagamento);



    let selecionado = {
      id_forma_pagamento: this.state.id_forma_pagamento,
      valor: this.state.valor,
      ds_forma_pagamento: formaPagamento.ds_forma_pagamento,
      nome_operador: formaPagamento.nome_operador,

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

  render() {

    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop='static'
        show={this.props.show}
        onHide={this.props.onHide}>
        <form onSubmit={this.incluirPagamento}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Adicionar Pagamento</Modal.Title>
          </Modal.Header>
          <Modal.Body>

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
                  autocomplete="off"
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
                  required
                >
                </SelectFormasPagamento>
                <Button className="ml-2" color="success" onClick={this.SelecionarFormaDePagamento}>Incluir</Button>
              </InputGroup>
            </FormGroup>

            <Table striped bordered hover responsive>
              <thead className="thead-light">
                <tr>

                  <th>Valor</th>
                  <th>Forma de Pagamento</th>
                  <th>Remover</th>
                </tr>
              </thead>
              <tbody>
                {this.state.selecionados.map(obj => {
                  return (
                    <tr key={obj.id}>

                      <td>{obj.valor}</td>
                      <td>{obj.ds_forma_pagamento}</td>

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
            <Button type="submit" color="success">Confirmar</Button>
          </Modal.Footer>
        </form >
      </Modal >
    );
  }
}

export default IncluirPagamento;
