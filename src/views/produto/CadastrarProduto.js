import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import serverRequest from '../../utils/serverRequest';
import SelectMenu from '../../components/selectMenu/SelectMenu';
import UploadFoto from '../../components/uploadFoto/UploadFoto';


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

    let dados = await serverRequest.request('/produto/cadastrar', this.state);
    if (dados) {
      window.location.href = '#/cardapio/produto';
    }
  }

  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
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
              <Label>Nome do Produto:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-tag"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="nome_produto" value={this.state.nome_produto} onChange={this.changeInput} required />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Descrição:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
                </InputGroupAddon>
                <Input type="textarea" name="descricao" value={this.state.descricao} onChange={this.changeInput} />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label>Preço:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText><i className="fa fa-money"></i></InputGroupText>
                </InputGroupAddon>
                <Input name="preco" value={this.state.preco} onChange={this.changeInput} required/>
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
