import React from 'react';
import Select from 'react-select';
import Table from 'react-bootstrap/Table'
import MaskedInput from 'react-text-mask'
import { Link } from 'react-router-dom'
import Autosuggest from 'react-autosuggest';
const path = process.env.REACT_APP_SRV_PATH;
const pathWeb = process.env.REACT_APP_WEB_PATH;



class EditarRestaurante extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            formulario: {
                celular: '',
                cpf_administrador: '',
                cep: '',
                logradouro: '',
                numero: '',
                bairro: '',
                municipio: '',
                uf: 0,
                complemento: '',
                email: '',
                codigo_banco: 0,
                id_tipo_cadastro_conta: 0,
                id_tipo_conta: 0,
                agencia: '',
                conta: '',
                digito: '',
                enderecoDisabled: false,
            },
        }
    }

    componentDidMount() {
        this.obterVariaveisCadastro();
        this.selecionarRestaurante();
    }

    selecionarRestaurante = async (event) => {

        try {
            let res = await fetch(path + '/restaurante/obter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify({ "id_restaurante": this.props.location.id_restaurante })
            });
            let data = await res.json();

            let obj = data[0];
            this.setState({ formulario: obj });


        } catch (error) {

            console.log(error);
        }
    }


    updateRestaurante = async (event) => {

        let formulario = Object.assign({}, this.state.formulario);
        // ajustando os valores dos Select
        formulario.uf = formulario.uf.uf;
        formulario.id_tipo_cadastro_conta = formulario.id_tipo_cadastro_conta.id_tipo_cadastro_conta;
        formulario.id_tipo_conta = formulario.id_tipo_conta.id_tipo_conta;
        formulario.codigo_banco = formulario.codigo_banco.codigo;
        // ajustando os valores com mascara
        formulario.cep = formulario.cep.replace(/\D/g, '');
        formulario.cpf_administrador = formulario.cpf_administrador.replace(/\D/g, '')
        formulario.celular = formulario.celular.replace(/\D/g, '')


        let res = await fetch(path + '/restaurante/editar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify(formulario)
        });
        let sucess = await res.ok;

        if (sucess) {
            alert('RESTAURANTE CADASTRADO COM SUCESSO!');
            window.location.href = pathWeb + '/Login'
        } else {
            let err = await res.json();
            alert('ERRO NO CADASTRO: ' + err.msg);
        }
    }
    obterVariaveisCadastro = async function () {
        let res = await fetch(path + '/restaurante/obterVariaveisCadastro', {
            method: 'POST',
        });
        let dados = await res.json();
        this.setState({
            bancos: dados[0],
            municipios: dados[1],
            estados: dados[2],
            tipoConta: dados[3],
            tipoCadastroConta: dados[4]
        });
    }
    formChange = (event) => {
        if (event.target.name) {
            let formNewState = Object.assign({}, this.state.formulario);
            formNewState[event.target.name] = event.target.value;
            this.setState({ formulario: formNewState });
        }
    }
    formChangeSelect = name => value => {
        let formNewState = Object.assign({}, this.state.formulario);
        formNewState[name] = value;
        this.setState({ formulario: formNewState });
    }
    validarCelular = (event) => {
        let ok = false, msg = '';
        let val = event.target.value.replace(/\D/g, '');
        if (!val) {
            msg = 'Campo obrigatório';
        }
        else if (val.length < 11) {
            msg = 'Celular incompleto';
        }
        else {
            ok = true;
        }

        let newState = Object.assign({}, this.state.validacao);
        newState.celular.ok = ok;
        newState.celular.msg = msg;
        this.setState({ validacao: newState });
    }
    validarEmail = (event) => {
        let ok = false, msg = '';
        let val = event.target.value;
        if (!val) {
            msg = 'Campo obrigatório';
        }
        else if (!/.+@.+\..+/.test(val)) {
            msg = 'Email incorreto';
        }
        else {
            ok = true;
        }

        let newState = Object.assign({}, this.state.validacao);
        newState.email.ok = ok;
        newState.email.msg = msg;
        this.setState({ validacao: newState });
    }
    validarCPF = (event) => {
        let ok = false, msg = '';
        let val = event.target.value.replace(/\D/g, '');
        if (!val) {
            msg = 'Campo obrigatório';
        }
        else if (!this.testarCPF(val)) {
            msg = 'CPF incorreto';
        }
        else {
            ok = true;
        }

        let newState = Object.assign({}, this.state.validacao);
        newState.cpf_administrador.ok = ok;
        newState.cpf_administrador.msg = msg;
        this.setState({ validacao: newState });
    }
    validarSenha = (event) => {
        let ok = false, msg = '';
        let val = event.target.value;
        if (!val) {
            msg = 'Campo obrigatório';
        }
        else if (val.length < 8) {
            msg = 'Senha deve conter 8 dígitos';
        }
        else if (!(/^(?=.*[a-zA-Z])(?=.*[0-9])/).test(val)) {
            msg = 'Senha deve conter letras e números';
        }
        else {
            ok = true;
        }

        let newState = Object.assign({}, this.state.validacao);
        newState.senha.ok = ok;
        newState.senha.msg = msg;
        this.setState({ validacao: newState });
    }
    validarCEP = async (event) => {
        let ok = false, msg = '';
        let val = event.target.value.replace(/\D/g, '');
        if (!val) {
            msg = 'Campo obrigatório';
        }
        else if (val.length < 8) {
            msg = 'CEP Incompleto';
        }
        else {
            ok = true;
        }

        let newState = Object.assign({}, this.state.validacao);
        newState.cep.ok = ok;
        newState.cep.msg = msg;
        this.setState({ validacao: newState });

        if (val.length == 8) {
            let res = await fetch('http://viacep.com.br/ws/' + val + '/json/');
            let dados = await res.json();
            if (!dados['erro']) {
                let formNewState = Object.assign({}, this.state.formulario);
                formNewState['logradouro'] = dados.logradouro;
                formNewState['bairro'] = dados.bairro;
                formNewState['municipio'] = dados.localidade;
                formNewState['uf'] = this.state.estados.find(e => e.uf == dados.uf);
                formNewState['enderecoDisabled'] = true;
                this.setState({ formulario: formNewState });

                let ValidnewState = Object.assign({}, this.state.validacao);
                ValidnewState.logradouro.ok = true;
                ValidnewState.logradouro.msg = '';
                ValidnewState.bairro.ok = true;
                ValidnewState.bairro.msg = '';
                ValidnewState.municipio.ok = true;
                ValidnewState.municipio.msg = '';
                ValidnewState.uf.ok = true;
                ValidnewState.uf.msg = '';
                this.setState({ validacao: ValidnewState });
            }
            else {
                let formNewState = Object.assign({}, this.state.formulario);
                formNewState['logradouro'] = '';
                formNewState['bairro'] = '';
                formNewState['municipio'] = '';
                formNewState['uf'] = '';
                formNewState['enderecoDisabled'] = false;
                this.setState({ formulario: formNewState });

                let ValidnewState = Object.assign({}, this.state.validacao);
                ValidnewState.logradouro.ok = false;
                ValidnewState.logradouro.msg = 'Campo obrigatório';
                ValidnewState.bairro.ok = false;
                ValidnewState.bairro.msg = 'Campo obrigatório';
                ValidnewState.municipio.ok = false;
                ValidnewState.municipio.msg = 'Campo obrigatório';
                ValidnewState.uf.ok = false;
                ValidnewState.uf.msg = 'Campo obrigatório';
                this.setState({ validacao: ValidnewState });
            }
        }
    }

    testarCPF = (strCPF) => {
        var Soma;
        var Resto;
        Soma = 0;
        if (strCPF == "00000000000") return false;

        for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) return false;

        Soma = 0;
        for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) return false;
        return true;
    }


    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.state.municipios.filter(lang =>
            lang.municipio.toLowerCase().slice(0, inputLength) === inputValue
        );
    };
    getSuggestionValue = suggestion => {
        let formNewState = Object.assign({}, this.state.formulario);
        formNewState['municipio'] = suggestion.municipio;
        this.setState({ formulario: formNewState });
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





    render() {
        return (


            <div>
                <form>
                    <h2>Registrar Restaurante</h2>


                    <label>Cnpj</label>

                    <tr>{this.state.formulario.cnpj}</tr>

                    <p></p>
                    <label>NomeFantasia</label>
                    <tr>{this.state.formulario.nome_fantasia}</tr>

                    <p></p>
                    <label>Cep</label>
                    <p></p>

                    <MaskedInput
                        value={this.state.formulario.cep}
                        onChange={this.formChange}
                        onBlur={this.validarCEP}
                        name='cep'
                        placeholder='Cep'
                        mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/,]}
                        guide={true}
                    />

                    <p></p>
                    <label>Logradouro</label>
                    <p></p>

                    <input
                        type='text'
                        placeholder='Logradouro'
                        name='logradouro'
                        onChange={this.formChange}
                        onBlur={this.validarCampoVazio}
                        value={this.state.formulario.logradouro}
                        disabled={this.state.formulario.enderecoDisabled}
                    />

                    <p></p>
                    <label>Número</label>
                    <p></p>

                    <MaskedInput
                        type='text'
                        placeholder='Número'
                        name='numero'
                        onChange={this.formChange}
                        onBlur={this.validarCampoVazio}
                        value={this.state.formulario.numero}
                        mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                        guide={false}
                    />

                    <p></p>
                    <label>Complemento</label>
                    <p></p>

                    <input
                        type='text'
                        placeholder='Complemento'
                        name='complemento'
                        value={this.state.formulario.complemento.msg}
                        onChange={this.formChange}
                    />

                    <p></p>
                    <label>Bairro</label>
                    <p></p>

                    <input
                        type='text'
                        placeholder='Bairro'
                        name='bairro'
                        value={this.state.formulario.bairro}
                        onChange={this.formChange}
                        onBlur={this.validarCampoVazio}
                        disabled={this.state.formulario.enderecoDisabled}
                    />

                    <p></p>
                    <label>Municipio</label>
                    <p></p>
                    
                    <Select
                        name="municipio"
                        getOptionLabel={option => option.municipio}
                        getOptionValue={option => option.municipio}
                        value={this.state.formulario.municipio}
                        isDisabled={this.state.formulario.enderecoDisabled}
                    />

<p></p>
                    <label>Uf</label>
                    <p></p>
                    <Select
                        name="uf"
                        options={this.state.estados}
                        getOptionLabel={option => option.uf}
                        getOptionValue={option => option.uf}
                        value={this.state.formulario.uf}
                        onChange={this.formChangeSelect('uf')}
                        isDisabled={this.state.formulario.enderecoDisabled}
                    />


                    <p></p>
                    <label>celular</label>
                    <p></p>
                    <MaskedInput placeholder='Celular'
                        name='celular'
                        value={this.state.formulario.celular}
                        onChange={this.formChange}
                        onBlur={this.validarCelular}
                        mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,]}
                        guide={true}
                    />

                    <p></p>
                    <label>Email</label>
                    <p></p>
                    <input
                        type='text'
                        placeholder='E-mail'
                        name='email'
                        value={this.state.formulario.email}
                        onChange={this.formChange}
                        onBlur={this.validarEmail}
                    />

                    <p></p>
                    <label>CodigodoBanco</label>
                    <p></p>
                    <Select
                        name="id_tipo_cadastro_conta"
                        options={this.state.tipoCadastroConta}
                        getOptionLabel={option => option.tipo_cadastro_conta}
                        getOptionValue={option => option.id_tipo_cadastro_conta}
                        value={this.state.formulario.id_tipo_cadastro_conta}
                        onChange={this.formChangeSelect('id_tipo_cadastro_conta')}
                    />



                    <p></p>
                    <label>Banco</label>
                    <p></p>
                    <Select
                        name="codigo_banco"
                        options={this.state.bancos}
                        getOptionLabel={option => option.nome}
                        getOptionValue={option => option.codigo}
                        value={this.state.formulario.codigo_banco}
                        onChange={this.formChangeSelect('codigo_banco')}
                    />

                    <p></p>
                    <label>TipodeConta</label>
                    <p></p>

                    <Select
                        name="id_tipo_conta"
                        options={this.state.tipoConta}
                        getOptionLabel={option => option.tipo_conta}
                        getOptionValue={option => option.id_tipo_conta}
                        value={this.state.formulario.id_tipo_conta}
                        onChange={this.formChangeSelect('id_tipo_conta')}
                    />

                    <p></p>
                    <label>Agência</label>
                    <p></p>
                    <MaskedInput
                        placeholder='Agência'
                        name='agencia'
                        value={this.state.formulario.agencia}
                        onChange={this.formChange}
                        onBlur={this.validarCampoVazio}
                        mask={[/\d/, /\d/, /\d/, /\d/]}
                    />

                    <p></p>
                    <label>Conta / Digito</label>
                    <p></p>
                    <MaskedInput
                        placeholder='Conta'
                        name='conta'
                        value={this.state.formulario.conta}
                        onChange={this.formChange}
                        onBlur={this.validarCampoVazio}
                        mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                        guide={false}
                    />
                    <MaskedInput
                        name='digito'
                        placeholder='Dígito'
                        value={this.state.formulario.digito}
                        onChange={this.formChange}
                        onBlur={this.validarCampoVazio}
                        mask={[/[a-zA-Z0-9]/, /[a-zA-Z0-9]/]}
                        guide={false}
                    />

                    <p></p>
                    <label>Cpf</label>
                    <p></p>
                    <MaskedInput
                        onChange={this.formChange}
                        onBlur={this.validarCPF}
                        value={this.state.formulario.cpf_administrador}
                        placeholder='CPF Administrador'
                        name='cpf_administrador'
                        mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/,]}
                        guide={true}
                    />

                    <p></p>
                    <label>NomeAdministrador</label>
                    <p></p>
                    <input
                        type='text'
                        placeholder='Nome Administrador'
                        name='nome_administrador'
                        onChange={this.formChange}
                        onBlur={this.validarCampoVazio}
                        value={this.state.formulario.nome_administrador}
                    />


                    <p></p>


                    <button class="btn btn-primary" type='button' onClick={this.updateRestaurante}>Editar</button>

                </form>
            </div>


        )
    }
}


export default EditarRestaurante;