import React, { Component } from 'react';
import { Form, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import Select from 'react-select';

const stateName = "Step3";

class Step3 extends Component {

  constructor(props) {
    super(props);
    this.state = props.state[stateName] || {
      codigo_banco: "",
      id_tipo_cadastro_conta: "",
      id_tipo_conta: "",
      agencia: "",
      conta: "",
      digito: "",
      validacao: {
        cnpj: { ok: false, msg: '*' },
        razao_social: { ok: false, msg: '*' },
        cep: { ok: false, msg: '*' },
        logradouro: { ok: false, msg: '*' },
        numero: { ok: false, msg: '*' },
        bairro: { ok: false, msg: '*' },
        municipio: { ok: false, msg: '*' },
        uf: { ok: false, msg: '*' },
        complemento: { ok: true },
        celular: { ok: false, msg: '*' },
        email: { ok: false, msg: '*' },
        codigo_banco: { ok: false, msg: '*' },
        id_tipo_cadastro_conta: { ok: false, msg: '*' },
        id_tipo_conta: { ok: false, msg: '*' },
        agencia: { ok: false, msg: '*' },
        conta: { ok: false, msg: '*' },
        digito: { ok: false, msg: '*' },
        cpf_administrador: { ok: false, msg: '*' },
        nome_administrador: { ok: false, msg: '*' },
        codigo_restaurante: { ok: false, msg: '*' },
        nome_restaurante: { ok: false, msg: '*' },
        login: { ok: false, msg: '*' },
        senha: { ok: false, msg: '*' }
      },
    }
  }


  componentDidMount() {
    this.obterVariaveisCadastro();
  }
  obterVariaveisCadastro = async function () {
    let res = await fetch('http://localhost:3001/restaurante/obterVariaveisCadastro', {
      method: 'POST',
    });
    let dados = await res.json();
    this.setState({
      bancos: dados[0],
      tipoConta: dados[3],
      tipoCadastroConta: dados[4]
    });
  }
  formChange = (event) => {
    if (event.target.name) {
      let formNewState = Object.assign({}, this.state);
      formNewState[event.target.name] = event.target.value;
      this.setState(formNewState);
    }
  }
  formChangeSelect = name => value => {
    let formNewState = Object.assign({}, this.state);
    formNewState[name] = value;
    this.setState(formNewState);

    let ValidnewState = Object.assign({}, this.state.validacao);
    ValidnewState[name].ok = true;
    ValidnewState[name].msg = '';
    this.setState({ validacao: ValidnewState });
  }
  validarCampoVazio = (event) => {
    let ok = false, msg = '';

    if (!event.target.value)
      msg = 'Campo obrigatório';
    else
      ok = true;

    let newState = Object.assign({}, this.state.validacao);
    newState[event.target.name].ok = ok;
    newState[event.target.name].msg = msg;
    this.setState({ validacao: newState });
  }
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.state.municipios.filter(lang =>
      lang.municipio.toLowerCase().slice(0, inputLength) === inputValue
    );
  };
  getSuggestionValue = suggestion => {
    let formNewState = Object.assign({}, this.state);
    formNewState['municipio'] = suggestion.municipio;
    this.setState(formNewState);
  };
  renderSuggestion = suggestion => (
    <div>
      {suggestion.municipio}
    </div>
  );
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };


  prosseguir = (event) => {
    event.preventDefault();
    this.props.saveValues(stateName, this.state);
    this.props.nextStep();
  }

  retornar = () => {
    this.props.saveValues(stateName, this.state);
    this.props.previousStep();
  }

  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }




  render() {
    return (
      <Form name="form" onSubmit={this.prosseguir}>
        <h4 className="text-center">Dados Bancários</h4>



        <FormGroup>
          <Label>Banco:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-credit-card"></i></InputGroupText>
            </InputGroupAddon>

            <Select
              name="codigo_banco"
              options={this.state.bancos}
              getOptionLabel={option => option.nome}
              getOptionValue={option => option.codigo}
              onChange={this.formChangeSelect('codigo_banco')}
              value={this.state.codigo_banco}
            />
            <span style={{ color: 'red' }}>{this.state.validacao.codigo_banco.msg}</span>

          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Tipo de Cadastro de Conta:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-credit-card"></i></InputGroupText>
            </InputGroupAddon>



            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="id_tipo_cadastro_conta" id="pessoaFisica" value="0" />
              <label class="form-check-label" for="pessoaFisica">Pessoa Física</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="id_tipo_cadastro_conta" id="pessoaJuridica" value="1" />
              <label class="form-check-label" for="pessoaJuridica">Pessoa Jurídica</label>
            </div>

            <span style={{ color: 'red' }}>{this.state.validacao.id_tipo_cadastro_conta.msg}</span>


          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Tipo de Conta:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-credit-card"></i></InputGroupText>
            </InputGroupAddon>

            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="id_tipo_conta" id="contaCorrente" value="0" />
              <label class="form-check-label" for="contaCorrente">Conta Corrente</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="id_tipo_conta" id="contaPoupanca" value="1" />
              <label class="form-check-label" for="contaPoupanca">Conta Poupança</label>
            </div>

            <span style={{ color: 'red' }}>{this.state.validacao.id_tipo_conta.msg}</span>

          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Agencia:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-credit-card"></i></InputGroupText>
            </InputGroupAddon>
            <Input
              name="agencia"
              value={this.state.agencia}
              onChange={this.changeInput}
              onBlur={this.validarCampoVazio}
            />

            <span style={{ color: 'red' }}>{this.state.validacao.agencia.msg}</span>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Conta:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-credit-card"></i></InputGroupText>
            </InputGroupAddon>
            <Input
              name="conta"
              value={this.state.conta}
              onChange={this.changeInput}
              onBlur={this.validarCampoVazio}
            />

            <span style={{ color: 'red' }}>{this.state.validacao.conta.msg}</span>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Dígito:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-credit-card"></i></InputGroupText>
            </InputGroupAddon>
            <Input
              name="digito"
              value={this.state.digito}
              onChange={this.changeInput}
              onBlur={this.validarCampoVazio}
            />
            <span style={{ color: 'red' }}>{this.state.validacao.digito.msg}</span>

          </InputGroup>
        </FormGroup>

        <Button onClick={this.retornar} type="button" className="pull-left" color="secondary"><i className="icon-arrow-left"></i> Retornar</Button>
        <Button type="submit" className="pull-right" color="success"><i className="icon-arrow-right"></i> Prosseguir</Button>

      </Form>
    );
  }
}

export default Step3;
