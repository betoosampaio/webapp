import React, { Component } from 'react';
import { Form, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import Select from 'react-select';
import MaskedInput from 'react-text-mask';

import SelectBanco from '../../components/selectBanco/SelectBanco'

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

            <SelectBanco
              name="codigo_banco"
              value={this.state.codigo_banco}
              onChange={this.changeInput}>
            </SelectBanco>


           

          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Tipo de Cadastro de Conta:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-credit-card"></i></InputGroupText>
            </InputGroupAddon>



            <div class="form-check form-check-inline">

              <input class="form-check-input" 
              type="radio" name="id_tipo_cadastro_conta" 
              id="pessoaFisica" value={this.state.id_tipo_cadastro_conta = '0'} />

              <label class="form-check-label" for="pessoaFisica">Pessoa Física</label>
            </div>
            <div class="form-check form-check-inline">

              <input class="form-check-input" type="radio" 
              name="id_tipo_cadastro_conta" id="pessoaJuridica" value={this.state.id_tipo_cadastro_conta = '1'} />

              <label class="form-check-label" for="pessoaJuridica">Pessoa Jurídica</label>
            </div>

        


          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Tipo de Conta:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-credit-card"></i></InputGroupText>
            </InputGroupAddon>

            <div class="form-check form-check-inline">

              <input class="form-check-input"
               type="radio" name="id_tipo_conta"
                id="contaCorrente" value={this.state.id_tipo_conta = '0'} />

              <label class="form-check-label" 
              for="contaCorrente">Conta Corrente</label>
            </div>
            <div class="form-check form-check-inline">

              <input class="form-check-input"
               type="radio" name="id_tipo_conta" id="contaPoupanca" 
               value={this.state.id_tipo_conta = '1'} />

              <label class="form-check-label" for="contaPoupanca">Conta Poupança</label>
            </div>

           

          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Agencia:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-credit-card"></i></InputGroupText>
            </InputGroupAddon>

            <MaskedInput
              className="form-control"
              name="agencia"
              value={this.state.agencia}
              onChange={this.changeInput}
            
              mask={[/\d/, /\d/, /\d/, /\d/]}
            />


          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Conta:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-credit-card"></i></InputGroupText>
            </InputGroupAddon>

            <MaskedInput
              className="form-control"
              name="conta"
              value={this.state.conta}
              onChange={this.changeInput}
           
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
              guide={false}
            />

     
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label>Dígito:</Label>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="icon-credit-card"></i></InputGroupText>
            </InputGroupAddon>
            <MaskedInput
              className="form-control"
              name="digito"
              value={this.state.digito}
              onChange={this.changeInput}
             
              mask={[/[a-zA-Z0-9]/, /[a-zA-Z0-9]/]}
              guide={false}
            />
          

          </InputGroup>
        </FormGroup>

        <Button onClick={this.retornar} type="button" className="pull-left" color="secondary"><i className="icon-arrow-left"></i> Retornar</Button>
        <Button type="submit" className="pull-right" color="success"><i className="icon-arrow-right"></i> Prosseguir</Button>

      </Form>
    );
  }
}

export default Step3;
