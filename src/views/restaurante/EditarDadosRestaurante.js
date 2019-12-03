import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, FormFeedback } from 'reactstrap';
import MaskedInput from '../../components/MaskedInput';
import SelectUF from '../../components/SelectUf';
import SuggestMunicipio from '../../components/SuggestMunicipio';
import SelectEspecialidade from '../../components/SelectEspecialidade';
import serverRequest from '../../utils/serverRequest';
import Modal from 'react-bootstrap/Modal'
import FotoRestaurante from '../../components/FotoRestaurante';
import UploadFotoRestaurante from '../../components/UploadFotoRestaurante';


class EditarDadosRestaurante extends Component {

  constructor(props) {

    super(props);
    this.state = {
      showConfirm: false,
      imagem: "",
      razao_social: "",
      cep: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      municipio: "",
      uf: "",
      id_especialidade: "",
      enderecoDisabled: false,


      validacao: {
        razao_social: { valid: false, invalid: false, msg: '' },
        nome_restaurante: { valid: false, invalid: false, msg: '' },
        id_especialidade: { valid: false, invalid: false, msg: '' },
        cep: { valid: false, invalid: false, msg: '' },
        logradouro: { valid: false, invalid: false, msg: '' },
        numero: { valid: false, invalid: false, msg: '' },
        complemento: { valid: false },
        bairro: { valid: false, invalid: false, msg: '' },
        municipio: { valid: false, invalid: false, msg: '' },
        uf: { valid: false, msg: '' },
      },
    };
  }


  validarRazaoSocial = (event) => {
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
    newState.razao_social.valid = valid;
    newState.razao_social.invalid = invalid;
    newState.razao_social.msg = msg;
    this.setState({ validacao: newState });
  }

  validarNomedoRestaurante = (event) => {
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
    newState.nome_restaurante.valid = valid;
    newState.nome_restaurante.invalid = invalid;
    newState.nome_restaurante.msg = msg;
    this.setState({ validacao: newState });
  }

  validarCEP = async (event) => {
    let valid = false, invalid = true, msg = '';
    let val = event.target.value.replace(/\D/g, '');
    if (val.length < 8) {
      msg = 'Formato inválido';
    }

    else {
      valid = true;
      invalid = false;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.cep.valid = valid;
    newState.cep.invalid = invalid;
    newState.cep.msg = msg;
    this.setState({ validacao: newState });

    if (val.length === 8) {
      let res = await fetch('http://viacep.com.br/ws/' + val + '/json/');
      let dados = await res.json();
      if (!dados['erro']) {
        let formNewState = Object.assign({}, this.state);
        formNewState['logradouro'] = dados.logradouro;
        formNewState['bairro'] = dados.bairro;
        formNewState['municipio'] = dados.localidade;
        formNewState['uf'] = dados.uf;
        formNewState['enderecoDisabled'] = true;
        this.setState(formNewState);
      }
      else {
        let formNewState = Object.assign({}, this.state);
        formNewState['logradouro'] = '';
        formNewState['bairro'] = '';
        formNewState['municipio'] = '';
        formNewState['uf'] = '';
        formNewState['enderecoDisabled'] = false;
        this.setState(formNewState);
      }
    }
  }

  validarIdEspecialidade = (event) => {
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
    newState.id_especialidade.valid = valid;
    newState.id_especialidade.invalid = invalid;
    newState.id_especialidade.msg = msg;
    this.setState({ validacao: newState });
  }

  validarLogradouro = (event) => {
    let valid = false, invalid = true, msg = '';
    let val = event.target.value;
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (val.length < 4) {
      msg = 'Este campo deve conter 3 caracteres ou mais';
    }
    else {
      valid = true;
      invalid = false;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.logradouro.valid = valid;
    newState.logradouro.invalid = invalid;
    newState.logradouro.msg = msg;
    this.setState({ validacao: newState });
  }

  validarNumero = (event) => {
    let valid = false, invalid = true, msg = '';
    let val = event.target.value;
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (val.length < 1) {
      msg = 'Este campo deve conter 1 caracter ou mais';
    }
    else {
      valid = true;
      invalid = false;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.numero.valid = valid;
    newState.numero.invalid = invalid;
    newState.numero.msg = msg;
    this.setState({ validacao: newState });
  }

  validarComplemento = (event) => {
    let valid = false;
    let val = event.target.value;
    if (!val) {
    }
    else {
      valid = true;
    }
    let newState = Object.assign({}, this.state.validacao);
    newState.complemento.valid = valid;
    this.setState({ validacao: newState });
  }

  validarBairro = (event) => {
    let valid = false, invalid = true, msg = '';
    let val = event.target.value;
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (val.length < 4) {
      msg = 'Este campo deve conter 4 caracter ou mais';
    }
    else {
      valid = true;
      invalid = false;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.bairro.valid = valid;
    newState.bairro.invalid = invalid;
    newState.bairro.msg = msg;
    this.setState({ validacao: newState });
  }

  validarMunicipio = (event) => {
    let valid = false, invalid = true, msg = '';
    let val = event.target.value;
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else if (val.length < 4) {
      msg = 'Este campo deve conter 4 caracter ou mais';
    }
    else {
      valid = true;
      invalid = false;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.municipio.valid = valid;
    newState.municipio.invalid = invalid;
    newState.municipio.msg = msg;
    this.setState({ validacao: newState });
  }

  validarEstado = (event) => {
    let valid = false, msg = '';
    let val = event.target.value;
    if (!val) {
      msg = 'Campo obrigatório';
    }
    else {
      valid = true;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.uf.valid = valid;
    newState.uf.msg = msg;
    this.setState({ validacao: newState });
  }


  componentDidMount() {
    this.obter();
  }

  obter = async () => {
    let dados = await serverRequest.request('/restaurante/obter');

    if (dados) {

      let obj = dados[0];

      obj.cnpj = obj.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
      obj.cep = obj.cep.replace(/(\d{5})(\d{3})/, "$1-$2");

      this.setState(obj);

    }
  }

  editar = async (event) => {
    event.preventDefault();

    let obj = {

      cpf_administrador: this.state.cpf_administrador,
      nome_administrador: this.state.nome_administrador,
      celular: this.state.celular,
      email: this.state.email,

      cnpj: this.state.cnpj,
      imagem: this.state.imagem,
      razao_social: this.state.razao_social,
      nome_restaurante: this.state.nome_restaurante,
      cep: this.state.cep.replace(/\D/g, ''),
      logradouro: this.state.logradouro,
      numero: this.state.numero,
      complemento: this.state.complemento,
      bairro: this.state.bairro,
      municipio: this.state.municipio,
      uf: this.state.uf,
      id_especialidade: this.state.id_especialidade,

      codigo_banco: this.state.codigo_banco || "0",
      id_tipo_cadastro_conta: this.state.id_tipo_cadastro_conta || "0",
      id_tipo_conta: this.state.id_tipo_conta || "0",
      agencia: this.state.agencia || "0",
      conta: this.state.conta || "0",
      digito: this.state.digito || "0",

      codigo_restaurante: this.state.codigo_restaurante,
      login: this.state.login,
      senha: this.state.senha,
    }

    let dados = await serverRequest.request('/restaurante/editar/dadosRestaurante', obj);
    if (dados) {
      window.location.href = '#/perfil';
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
          <h5><b>Editar dados do restaurante</b></h5>
        </CardHeader>
        <CardBody>

          <FormGroup>
            <Label>Logo do restaurante:</Label>
            <UploadFotoRestaurante name="imagem" onChange={this.changeInput} path={this.state.imagem} ></UploadFotoRestaurante>

            <FotoRestaurante src={this.state.value} height="50" width="50"></FotoRestaurante>
            <p></p>
          </FormGroup>

          <FormGroup>
            <Label><b>CNPJ do Restaurante: {this.state.cnpj} </b></Label>
            <p></p>
            <Label><b>Razão Social do Restaurante: </b></Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="icon-cup"></i></InputGroupText>
              </InputGroupAddon>
              <Input
                name="razao_social"
                value={this.state.razao_social}
                onChange={this.changeInput}
                type='text'
                required
                minLength="4"
                maxLength="255"
                placeholder='Razão social da empresa'
                invalid={this.state.validacao.razao_social.invalid}
                valid={this.state.validacao.razao_social.valid}
              />
              <FormFeedback>{this.state.validacao.razao_social.msg}</FormFeedback>
            </InputGroup>
          </FormGroup>


          <FormGroup>
            <Label>Especialidade: </Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="icon-cup"></i></InputGroupText>
              </InputGroupAddon>
              <SelectEspecialidade
                required
                name="id_especialidade"
                value={this.state.id_especialidade}
                onChange={this.changeInput}
                placeholder="Escreva aqui"
                valid={this.state.validacao.id_especialidade.valid}
                invalid={this.state.validacao.id_especialidade.invalid}
              >
              </SelectEspecialidade>
              <FormFeedback>{this.state.validacao.id_especialidade.msg}</FormFeedback>

            </InputGroup>
          </FormGroup>


          <FormGroup>
            <Label><b>CEP: </b></Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="icon-map"></i></InputGroupText>
              </InputGroupAddon>

              <MaskedInput
                maxLength="9"
                name="cep"
                className="form-control"
                value={this.state.cep}
                onChange={this.changeInput}
                placeholder='CEP do restaurante'
                onBlur={this.validarCEP}
                mascara="99999-999"
                invalid={this.state.validacao.cep.invalid}
                valid={this.state.validacao.cep.valid}
                required
              />
              <FormFeedback>{this.state.validacao.cep.msg}</FormFeedback>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label><b>Logradouro: </b></Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="icon-map"></i></InputGroupText>
              </InputGroupAddon>
              <Input
                name="logradouro"
                value={this.state.logradouro}
                onChange={this.changeInput}
                type='text'
                placeholder='Avenida Paulista'
                disabled={this.state.enderecoDisabled}
                invalid={this.state.validacao.logradouro.invalid}
                valid={this.state.validacao.logradouro.valid}
                required
              />
              <FormFeedback>{this.state.validacao.logradouro.msg}</FormFeedback>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label><b>Número: </b></Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="icon-map"></i></InputGroupText>
              </InputGroupAddon>
              <Input
                name="numero"
                value={this.state.numero}
                onChange={this.changeInput}
                type='text'
                placeholder='Número do restaurante'
                invalid={this.state.validacao.numero.invalid}
                valid={this.state.validacao.numero.valid}
                required
              />
              <FormFeedback>{this.state.validacao.numero.msg}</FormFeedback>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label><b>Complemento</b> (opcional): </Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="icon-map"></i></InputGroupText>
              </InputGroupAddon>
              <Input
                type='text'
                placeholder='Bloco C'
                name="complemento"
                value={this.state.complemento}
                onChange={this.changeInput}
                onBlur={this.validarComplemento}
                valid={this.state.validacao.complemento.valid}
              />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label><b>Bairro: </b></Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="icon-map"></i></InputGroupText>
              </InputGroupAddon>
              <Input
                name="bairro"
                value={this.state.bairro}
                onChange={this.changeInput}
                disabled={this.state.enderecoDisabled}
                type='text'
                placeholder='Bela Vista'
                invalid={this.state.validacao.bairro.invalid}
                valid={this.state.validacao.bairro.valid}
                required
              />
              <FormFeedback>{this.state.validacao.bairro.msg}</FormFeedback>

            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label><b>Munícipio: </b></Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="icon-map"></i></InputGroupText>
              </InputGroupAddon>
              <SuggestMunicipio
                name="municipio"
                value={this.state.municipio}
                onChange={this.changeInput}
                disabled={this.state.enderecoDisabled}
                type='text'
                placeholder='Município do restaurante'
                invalid={this.state.validacao.municipio.invalid}
                valid={this.state.validacao.municipio.valid}
                required
              >
                <FormFeedback>{this.state.validacao.municipio.msg}</FormFeedback>
              </SuggestMunicipio>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label><b>Estado (UF): </b></Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="icon-map"></i></InputGroupText>
              </InputGroupAddon>
              <SelectUF
                name="uf"
                value={this.state.uf}
                onChange={this.changeInput}
                disabled={this.state.enderecoDisabled}
                onBlur={this.validarEstado}
                valid={this.state.validacao.uf.valid}
                required
              >
              </SelectUF>
            </InputGroup>
          </FormGroup>

        </CardBody>
        <Modal.Footer>
          <Button variant="primary" color="danger" onClick={() => { window.location.href = '#/restaurante' }} >Cancelar</Button>
          <Button variant="primary" color="success" onClick={this.editar}  >Confirmar</Button>
        </Modal.Footer>
      </Card>
    );
  }
}

export default EditarDadosRestaurante;