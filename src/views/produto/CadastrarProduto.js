import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import CurrencyInput from 'react-currency-input';
import serverRequest from '../../utils/serverRequest';
import SelectMenu from '../../components/selectMenu/SelectMenu';
import UploadFoto from '../../components/uploadFoto/UploadFoto';
import Modal from 'react-bootstrap/Modal'



class CadastrarProduto extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nome_produto: "",
      descricao: "",
      preco: "",
      id_menu: "",
      promocao: 0,
      imagem: "",
      visivel: 1,
    };
  }

  cadastrar = async (event) => {
    event.preventDefault();
    this.state.preco = this.state.preco.replace(',', '.');
    let dados = await serverRequest.request('/produto/cadastrar', this.state);
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

            <FormGroup>
              <Label>Nome do Produto:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-tag"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="nome_produto" value={this.state.nome_produto} onChange={this.changeInput} required placeholder="X-Salada" />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Descrição:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <Input type="textarea" name="descricao" value={this.state.descricao} onChange={this.changeInput} placeholder="Delicioso lanche com pão de brioche, queijo, carne, alface, tomate e maionese" />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Preço:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-money" > R$</i></InputGroupText>
                </InputGroupAddon>


                <CurrencyInput
                  decimalSeparator=","
                  thousandSeparator="."
                  value={this.state.preco}
                  name="preco"
                  className="form-control"
                  onChange={this.formChangeInput('preco')}
                  placeholder="R$ 10,00"

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
                <SelectMenu name="id_menu" value={this.state.id_menu} onChange={this.changeInput} required></SelectMenu>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Promoção:</Label>
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
      </form>
    );
  }
}

export default CadastrarProduto;
