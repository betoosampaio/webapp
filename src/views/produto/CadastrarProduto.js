import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, FormFeedback } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import CurrencyInput from 'react-currency-input';
import serverRequest from '../../utils/serverRequest';
import SelectMenu from '../../components/SelectMenu';
import UploadFoto from '../../components/UploadFoto';
import Modal from 'react-bootstrap/Modal'
import MaskedInput from '../../components/MaskedInput';




class CadastrarProduto extends Component {

  constructor(props) {
    super(props);
    this.state = {
      codigo_produto: "",
      nome_produto: "",
      descricao: "",
      preco: "0",
      id_menu: "",
      promocao: 0,
      imagem: "",
      visivel: 1,

      validacao: {
        codigo_produto: { valid: false, invalid: false, msg: '' },
        nome_produto: { valid: false, invalid: false, msg: '' },
        descricao: { valid: false },
        preco: { valid: false, invalid: false, msg: '' },
        id_menu: { valid: false, invalid: false, msg: '' },
      },
    }
  };

  validarCodigoProduto = (event) => {
    let valid = false, invalid = true, msg = '';
    let val = event.target.value;
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (val.length < 1) {
      msg = 'Este campo deve conter 1 caracteres ou mais';
    }
    else {
      valid = true;
      invalid = false;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.codigo_produto.valid = valid;
    newState.codigo_produto.invalid = invalid;
    newState.codigo_produto.msg = msg;
    this.setState({ validacao: newState });
  }

  validarNomeProduto = (event) => {
    let valid = false, invalid = true, msg = '';
    let val = event.target.value;
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (val.length < 4) {
      msg = 'Este campo deve conter 4 caracteres ou mais';
    }
    else {
      valid = true;
      invalid = false;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.nome_produto.valid = valid;
    newState.nome_produto.invalid = invalid;
    newState.nome_produto.msg = msg;
    this.setState({ validacao: newState });
  }

  validarDescricao = (event) => {
    let valid = false;
    let val = event.target.value;
    if (!val) {
    }
    else {
      valid = true;
    }
    let newState = Object.assign({}, this.state.validacao);
    newState.descricao.valid = valid;
    this.setState({ validacao: newState });
  }

  validarIdMenu = (event) => {
    let valid = false, invalid = true, msg = '';
    let val = event.target.value;
    if (!val) {
      msg = 'Campo obrigatório';
    }

    else {
      valid = true;
      invalid = false;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.id_menu.valid = valid;
    newState.id_menu.invalid = invalid;
    newState.id_menu.msg = msg;
    this.setState({ validacao: newState });
  }

  cadastrar = async (event) => {
    event.preventDefault();

    let obj = Object.assign({}, this.state);
    obj.preco = obj.preco.replace('.', '').replace(',', '.');
    let dados = await serverRequest.request('/produto/cadastrar', obj);

    if (dados) {
      this.setState({ showCadastrado: true });
    }
  }

  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }


  formChangeInput = name => value => {
    let formNewState = Object.assign({}, this.state);
    formNewState[name] = value;
    this.setState(formNewState);
  }

  changeSwitch = (event) => {
    this.setState({ [event.target.name]: event.target.checked ? 1 : 0 });
  }

  render() {
    return (
      <form name="form" onSubmit={this.cadastrar}>
        <Card>
          <CardHeader>
            <strong>Cadastrar Produto</strong>
          </CardHeader>
          <CardBody>

            <FormGroup>
              <Label>Código do Produto:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-tag"></i></InputGroupText>
                </InputGroupAddon>
                <Input
                  minLength='1'
                  maxLength='50'
                  name="codigo_produto"
                  value={this.state.codigo_produto}
                  onChange={this.changeInput}
                  onBlur={this.validarCodigoProduto}
                  invalid={this.state.validacao.codigo_produto.invalid}
                  valid={this.state.validacao.codigo_produto.valid}
                  placeholder="001"
                  required
                />
                <FormFeedback invalid>{this.state.validacao.codigo_produto.msg}</FormFeedback>

              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Nome do Produto:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-tag"></i></InputGroupText>
                </InputGroupAddon>
                <Input
                  name="nome_produto"
                  value={this.state.nome_produto}
                  onChange={this.changeInput}
                  onBlur={this.validarNomeProduto}
                  required
                  placeholder="X-Salada"
                  invalid={this.state.validacao.nome_produto.invalid}
                  valid={this.state.validacao.nome_produto.valid}
                />
                <FormFeedback invalid>{this.state.validacao.nome_produto.msg}</FormFeedback>

              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Descrição:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <Input
                  type="textarea"
                  name="descricao"
                  value={this.state.descricao}
                  onChange={this.changeInput}
                  placeholder="Delicioso lanche com pão de brioche, queijo, carne, alface, tomate e maionese"
                  onBlur={this.validarDescricao}
                  valid={this.state.validacao.descricao.valid}
                />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Preço:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText>R$</InputGroupText>
                </InputGroupAddon>
                <CurrencyInput
                  decimalSeparator=","
                  thousandSeparator="."
                  value={this.state.preco}
                  name="preco"
                  className="form-control"
                  onChange={this.formChangeInput('preco')}
                  placeholder="10,00"
                  required
                />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Menu:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-list-ul"></i></InputGroupText>
                </InputGroupAddon>
                <SelectMenu
                  name="id_menu"
                  value={this.state.id_menu}
                  onChange={this.changeInput}
                  required
                  onBlur={this.validarIdMenu}
                  invalid={this.state.validacao.id_menu.invalid}
                  valid={this.state.validacao.id_menu.valid}
                >
                  <FormFeedback invalid>{this.state.validacao.id_menu.msg}</FormFeedback>

                </SelectMenu>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Em promoção:</Label>
              <InputGroup>
                <AppSwitch name="promocao" className={'mx-1'} variant={'pill'} color={'success'} checked={this.state.promocao ? true : false} onChange={this.changeSwitch} />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Foto:</Label>
              <UploadFoto name="imagem" onChange={this.changeInput}></UploadFoto>
            </FormGroup>

          </CardBody>
          <CardFooter>
            <Button className="pull-right" color="success"><i className="fa fa-check"></i> Confirmar</Button>
          </CardFooter>
        </Card>

        <Modal
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.showCadastrado}
          onHide={() => { this.setState({ showCadastrado: false }) }}
          backdrop='static'
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmação</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Produto Cadastrado com sucesso!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" color="success" onClick={() => { window.location.href = '#/cardapio/produto' }}  >OK</Button>
          </Modal.Footer>
        </Modal>

      </form>
    );
  }
}

export default CadastrarProduto;
