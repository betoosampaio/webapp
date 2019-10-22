import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { AppSwitch } from '@coreui/react';
import CurrencyFormat from 'react-currency-format';
import CurrencyInput from 'react-currency-input';
import MaskedInput from 'react-text-mask'
import serverRequest from '../../utils/serverRequest';
import SelectMenu from '../../components/selectMenu/SelectMenu';
import UploadFoto from '../../components/uploadFoto/UploadFoto';
import Modal from 'react-bootstrap/Modal'


class EditarProduto extends Component {

  constructor(props) {

    super(props);
    this.state = {
      showConfirm: false,
      id_produto: "",
      nome_produto: "",
      descricao: "",
      preco: "",
      id_menu: "",
      promocao: "",
      imagem: "",
      visivel: "",
      ativo: "",
    };
  }

  componentDidMount() {
    this.obter(this.props.match.params.id);
  }

  obter = async (id) => {
    let dados = await serverRequest.request('/produto/obter', { "id_produto": id });
    if (dados) {
      this.setState(dados[0]);
    }
  }

  editar = async (event) => {
    event.preventDefault();

    this.state.preco = this.state.preco.replace('.', '');
    this.state.preco = this.state.preco.replace(',', '.');


    let dados = await serverRequest.request('/produto/editar', this.state);
    if (dados) {
      window.location.href = '#/cardapio/produto';
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

      <Card>
        <CardHeader>
          <strong>Cadastrar Produto</strong>
        </CardHeader>
        <CardBody>
          <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.showConfirm}
            onHide={() => { this.setState({ showConfirm: false }) }}
            backdrop='static'
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirmação</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>Tem certeza de que deseja Editar este Produto? </p>
            </Modal.Body>

            <Modal.Footer>

              <Button variant="primary" color="danger" onClick={() => { window.location.href = '#/cardapio/produto' }} >Cancelar</Button>
              <Button variant="primary" color="success" onClick={this.editar}  >Salvar</Button>
            </Modal.Footer>

          </Modal>

          <FormGroup>
            <Label>ID:</Label>
            <Input disabled name="id_produto" value={this.state.id_produto} onChange={this.changeInput} />
          </FormGroup>

          <FormGroup>
            <Label>Nome do Produto:</Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="fa fa-tag"></i></InputGroupText>
              </InputGroupAddon>
              <Input name="nome_produto" value={this.state.nome_produto} onChange={this.changeInput} placeholder="X-Salada" required />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label>Descrição:</Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
              </InputGroupAddon>
              <Input name="descricao" value={this.state.descricao} onChange={this.changeInput} placeholder="Delicioso lanche com pão de brioche, queijo, carne, alface, tomate e maionese" />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label>Preço:</Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="fa fa-money"></i></InputGroupText>
              </InputGroupAddon>

              <CurrencyInput
                decimalSeparator=","
                thousandSeparator="."
                value={this.state.preco}
                name="preco"
                className="form-control"
                onChange={this.formChangeInput('preco')}
                required placeholder="R$ 10,00"
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
            <Label>Visível:</Label>
            <InputGroup>
              <AppSwitch name="visivel" className={'mx-1'} variant={'pill'} color={'success'} checked={this.state.visivel ? true : false} onChange={this.changeSwitch} />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label>Foto:</Label>
            <UploadFoto name="imagem" onChange={this.changeInput} path={this.state.imagem}></UploadFoto>
          </FormGroup>

        </CardBody>
        <CardFooter>
          <Button type="submit" className="pull-right" color="success" onClick={() => this.setState({ showConfirm: true })} ><i className="fa fa-check"></i> Confirmar</Button>
        </CardFooter>
      </Card>

    );
  }
}

export default EditarProduto;
