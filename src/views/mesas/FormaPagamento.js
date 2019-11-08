import React, { Component } from 'react';
import { Button, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Input, Table } from 'reactstrap';
import serverRequest from '../../utils/serverRequest';
import Modal from 'react-bootstrap/Modal'
import MaskedNumberInput from '../../components/MaskedNumberInput';
import MaskedMoneyInput from '../../components/MaskedMoneyInput';
import SelectFormasPagamento from '../../components/SelectFormasPagamento';
import ReactDOMServer from 'react-dom/server';
import Foto from '../../components/Foto';
import { thisExpression } from '@babel/types';

class FormaPagamento extends Component {


  constructor(props) {
    super(props);
    this.state = {
      selecionados: '',
      valor: '',
      id_forma_pagamento: '',
      lista: [],
      selecionados: [],
      id_produto: "",
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

  incluirPagamento = async () => {

    if (this.state.selecionados.length > 0) {
      let obj = {
        id_mesa: this.props.id_mesa,
        valor: parseInt(this.state.selecionados[0].valor.replace(',','.')),
        id_forma_pagamento: this.state.selecionados[0].id_forma_pagamento,
      }
      console.log(obj)
      let dados = await serverRequest.request('/mesa/pagamento/incluir', obj);
      if (dados) {
        
      }
    }
  }






  changeInput1 = () => {

    let selecionado = { id_forma_pagamento: this.state.id_forma_pagamento, valor: this.state.valor }
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
                />

              </InputGroup>
            </FormGroup>


            <FormGroup>
              <Label>Forma de pagamento:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-credit-card"></i></InputGroupText>
                </InputGroupAddon>



                <SelectFormasPagamento
                  name="id_forma_pagamento"
                  value={this.state.id_forma_pagamento}
                  onChange={this.changeInput}
                >
                </SelectFormasPagamento >

                <Button color="success" onClick={this.changeInput1}>Incluir</Button>

              </InputGroup>
            </FormGroup>
            <Table striped bordered hover responsive>
              <thead className="thead-light">
                <tr>

                  <th>Valor</th>
                  <th>Forma de Pagamento</th>
                  <th>Horário</th>
                  <th>Usuário</th>
                </tr>
              </thead>
              <tbody>
                {this.state.selecionados.map(obj => {
                  return (
                    <tr key={obj.id}>

                      <td>{obj.valor}</td>
                      <td>{obj.id_forma_pagamento}</td>

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
            <Button type="submit" color="success">Incluir</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

export default FormaPagamento;
