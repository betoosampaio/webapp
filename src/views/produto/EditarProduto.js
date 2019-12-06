import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { AppSwitch } from '@coreui/react';
import MaskedMoneyInput from '../../components/MaskedMoneyInput';
import serverRequest from '../../utils/serverRequest';
import SelectMenu from '../../components/SelectMenu';
import SelectAmbiente from '../../components/SelectAmbiente';
import UploadFotoProduto from '../../components/UploadFotoProduto';
import Modal from 'react-bootstrap/Modal'

class EditarProduto extends Component {

  constructor(props) {

    super(props);
    this.state = {
      id_produto: "",
      codigo_produto: "",
      nome_produto: "",
      descricao: "",
      preco: "",
      id_menu: "",
      id_ambiente: "",
      promocao: "",
      vegetariano: "",
      vegano: "",
      imagem: "",
      ativo: "",
    };
  }

  componentDidMount() {
    this.obter(this.props.match.params.id);
  }

  obter = async (id) => {
    let dados = await serverRequest.request('/produto/obter', { "id_produto": id });
    if (dados) {
      dados[0].preco = dados[0].preco.toFixed(2).replace('.', ',');
      this.setState(dados[0]);
    }
  }

  editar = async (event) => {
    event.preventDefault();

    let obj = Object.assign({}, this.state);
    obj.preco = String(obj.preco).replace('.', '').replace(',', '.');

    let dados = await serverRequest.request('/produto/editar', obj);
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

      <Card>
        <CardHeader>
          <strong>Editar Produto</strong>
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
                required
                placeholder="001"
              />

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
                placeholder="X-Salada"
                required
              />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label>Descrição:</Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
              </InputGroupAddon>
              <Input
                name="descricao"
                value={this.state.descricao}
                onChange={this.changeInput}
                placeholder="Delicioso lanche com pão de brioche, queijo, carne, alface, tomate e maionese"
              />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label>Preço:</Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText>R$</InputGroupText>
              </InputGroupAddon>

              <MaskedMoneyInput
                precision="2"
                separator=","
                delimiter="."
                value={this.state.preco}
                name="preco"
                className="form-control"
                onChange={this.changeInput}
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
              <SelectMenu
                name="id_menu"
                value={this.state.id_menu}
                onChange={this.changeInput}
                required
              >
              </SelectMenu>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label>Ambiente:</Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="fa fa-list-ul"></i></InputGroupText>
              </InputGroupAddon>
              <SelectAmbiente
                name="id_ambiente"
                value={this.state.id_ambiente}
                onChange={this.changeInput}
                required
              >
              </SelectAmbiente>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label>Em promoção:</Label>
            <InputGroup>
              <AppSwitch
                name="promocao"
                className={'mx-1'}
                variant={'pill'}
                color={'success'}
                checked={this.state.promocao ? true : false}
                onChange={this.changeSwitch}
              />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label>Vegano:</Label>
            <InputGroup>
              <AppSwitch name="vegano" className={'mx-1'} variant={'pill'} color={'success'} checked={this.state.vegano ? true : false} onChange={this.changeSwitch} />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label>Vegetariano:</Label>
            <InputGroup>
              <AppSwitch name="vegetariano" className={'mx-1'} variant={'pill'} color={'success'} checked={this.state.vegetariano ? true : false} onChange={this.changeSwitch} />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label>Ativo:</Label>
            <InputGroup>
              <AppSwitch
                name="ativo"
                className={'mx-1'}
                variant={'pill'}
                color={'success'}
                checked={this.state.ativo ? true : false}
                onChange={this.changeSwitch}
              />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label>Foto:</Label>
            <UploadFotoProduto
              name="imagem"
              onChange={this.changeInput}
              path={this.state.imagem}
            >

            </UploadFotoProduto>
          </FormGroup>

        </CardBody>
        <Modal.Footer>
          <Button variant="primary" color="danger" onClick={() => { window.location.href = '#/cardapio/produto' }} >Cancelar</Button>
          <Button variant="primary" color="success" onClick={this.editar}  >Confirmar</Button>
        </Modal.Footer>
      </Card>

    );
  }
}

export default EditarProduto;
