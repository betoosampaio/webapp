import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import MaskedInput from 'react-text-mask';
import SelectUF from '../../components/selectUF/SelectUf';
import SuggestMunicipio from '../../components/suggestMunicipio/SuggestMunicipio';
import SelectEspecialidade from '../../components/selectEspecialidade/SelectEspecialidade';
import serverRequest from '../../utils/serverRequest';
import Modal from 'react-bootstrap/Modal'


class EditarDadosRestaurante extends Component {

  constructor(props) {

    super(props);
    this.state = {
      showConfirm: false,
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
        cnpj: { ok: true, msg: '' },
        razao_social: { ok: true, msg: '' },
        nome_restaurante: { ok: true, msg: '' },
        cep: { ok: true, msg: '' },
        logradouro: { ok: true, msg: '' },
        numero: { ok: true, msg: '' },
        bairro: { ok: true, msg: '' },
        municipio: { ok: true, msg: '' },
        uf: { ok: true, msg: '' },
      },
    };
  }

  validarCNPJ = async (event) => {
    let ok = false, msg = '';
    let val = event.target.value.replace(/\D/g, '');

    if (!this.testarCNPJ(val)) {
      msg = 'CNPJ incorreto';
    }
    else {
      ok = true;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.cnpj.ok = ok;
    newState.cnpj.msg = msg;
    this.setState({ validacao: newState });

    if (val.length === 14) {
      let dados = await serverRequest.request('/restaurante/checarSeCNPJExiste', { cnpj: val });
      if (dados.exists) {
        let newState = Object.assign({}, this.state.validacao);
        newState.cnpj.ok = false;
        newState.cnpj.msg = 'Este CNPJ já está cadastrado';
        this.setState({ validacao: newState });
      }
    }

  }

  validarCEP = async (event) => {
    let ok = false, msg = '';
    let val = event.target.value.replace(/\D/g, '');
    if (val.length < 8) {
      msg = 'CEP Incompleto';
    }
    else {
      ok = true;
    }

    let newState = Object.assign({}, this.state.validacao);
    newState.cep.ok = ok;
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

  testarCNPJ = (cnpj) => {

    if (cnpj === '') return false;

    if (cnpj.length !== 14)
      return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj === "00000000000000" ||
      cnpj === "11111111111111" ||
      cnpj === "22222222222222" ||
      cnpj === "33333333333333" ||
      cnpj === "44444444444444" ||
      cnpj === "55555555555555" ||
      cnpj === "66666666666666" ||
      cnpj === "77777777777777" ||
      cnpj === "88888888888888" ||
      cnpj === "99999999999999")
      return false;

    // Valida DVs
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
        pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado.toString() !== digitos.charAt(0))
      return false;
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
        pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado.toString() !== digitos.charAt(1))
      return false;

    return true;
  }

  componentDidMount() {
    this.obter(this.props.match.params.id);
  }

  obter = async (id) => {
    let dados = await serverRequest.request('/restaurante/obter', { "id_restaurante": id });
    if (dados) {
      this.setState(dados[0]);
    }
  }

  editar = async (event) => {
    event.preventDefault();

    let obj = {

      cpf_administrador: this.state.cpf_administrador.replace(/\D/g, ''),
      nome_administrador: this.state.nome_administrador,
      celular: this.state.celular.toString().replace(/\D/g, ''),
      email: this.state.email,

      cnpj: this.state.cnpj,
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

    //console.log(obj);

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
              <p>Tem certeza de que deseja Editar Dados do Restaurante? </p>
            </Modal.Body>

            <Modal.Footer>

              <Button variant="primary" color="danger" onClick={() => this.setState({ showConfirm: false })} >Cancelar</Button>
              <Button variant="primary" color="success" onClick={this.editar}  >Salvar</Button>
            </Modal.Footer>

          </Modal>

          <FormGroup>
            <Label><b>CNPJ do Restaurante: {this.state.cnpj} </b></Label>
            <p></p>
            <Label><b>Razão Social do Restaurante: </b></Label>


            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
              </InputGroupAddon>
              <Input
                name="razao_social"
                value={this.state.razao_social}
                onChange={this.changeInput}
                type='text'
                placeholder='Razão social da empresa'
                required
                minLength="4"
                maxLength="255"
              />
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
                onChange={this.changeInput}>
              </SelectEspecialidade>
            </InputGroup>
          </FormGroup>


          <FormGroup>
            <Label><b>CEP: </b></Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
              </InputGroupAddon>

              <MaskedInput
                name="cep"
                className="form-control"
                value={this.state.cep}
                onChange={this.changeInput}
                onBlur={this.validarCEP}
                placeholder='00000-000'
                mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/,]}
                guide={true}
                required
              />
              <span style={{ color: 'red' }}>{this.state.validacao.cep.msg}</span>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label><b>Logradouro: </b></Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
              </InputGroupAddon>
              <Input
                name="logradouro"
                value={this.state.logradouro}
                onChange={this.changeInput}
                type='text'
                placeholder='Avenida Paulista'
                disabled={this.state.enderecoDisabled}
                required
              />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label><b>Número: </b></Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
              </InputGroupAddon>
              <Input
                name="numero"
                value={this.state.numero}
                onChange={this.changeInput}
                type='text'
                placeholder='1234'
                required
              />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label><b>Complemento</b> (opcional): </Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
              </InputGroupAddon>
              <Input
                type='text'
                placeholder='Bloco C'
                name="complemento"
                value={this.state.complemento}
                onChange={this.changeInput}
              />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label><b>Bairro: </b></Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
              </InputGroupAddon>
              <Input
                name="bairro"
                value={this.state.bairro}
                onChange={this.changeInput}
                disabled={this.state.enderecoDisabled}
                type='text'
                placeholder='Bela Vista'
                required
              />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label><b>Munícipio: </b></Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
              </InputGroupAddon>
              <SuggestMunicipio
                name="municipio"
                value={this.state.municipio}
                onChange={this.changeInput}
                disabled={this.state.enderecoDisabled}
                type='text'
                placeholder='São Paulo'
                required
              ></SuggestMunicipio>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label><b>Estado (UF): </b></Label>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText><i className="fa fa-pencil"></i></InputGroupText>
              </InputGroupAddon>
              <SelectUF
                name="uf"
                value={this.state.uf}
                onChange={this.changeInput}
                disabled={this.state.enderecoDisabled}
                required>
              </SelectUF>
            </InputGroup>
          </FormGroup>

        </CardBody>
        <Modal.Footer>
          <Button variant="primary" color="danger" onClick={() => { window.location.href = '#/perfil' }} >Cancelar</Button>
          <Button type="submit" className="pull-right" color="success" onClick={() => this.setState({ showConfirm: true })} ><i className="fa fa-check"></i> Confirmar</Button>
        </Modal.Footer>
      </Card>
    );
  }
}

export default EditarDadosRestaurante;