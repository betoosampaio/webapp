import React from 'react';
import Select from 'react-select';
import MaskedInput from 'react-text-mask';
import Autosuggest from 'react-autosuggest';
const path = process.env.REACT_APP_SRV_PATH;
class SignIn extends React.Component {
    state = {
        bancos: [],
        estados: [],
        municipios: [],
        tipoConta: [],
        tipoCadastroConta: [],
        suggestions: [],
        formulario: {
            cnpj: '',
            nome_fantasia: '',
            cep: '',
            logradouro: '',
            numero: '',
            bairro: '',
            municipio: '',
            uf: 0,
            complemento: '',
            celular: '',
            email: '',
            codigo_banco: 0,
            id_tipo_cadastro_conta: 0,
            id_tipo_conta: 0,
            agencia: '',
            conta: '',
            digito: '',
            cpf_administrador: '',
            nome_administrador: '',
            codigo_restaurante: '',
            login: '',
            senha: '',
            enderecoDisabled: false,
        },
        validacao: {
            cnpj: { ok: false, msg: '*' },
            nome_fantasia: { ok: false, msg: '*' },
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
            login: { ok: false, msg: '*' },
            senha: { ok: false, msg: '*' }
        },
    };
    componentDidMount() {
        this.obterVariaveisCadastro();
    }
    cadastrarRestaurante = async (event) => {

        for (let p in this.state.validacao) {
            if(!this.state.validacao[p].ok){
                alert('Preencha todos os campos corretamente');
                return false;
            }
        }

        let formulario = Object.assign({}, this.state.formulario);
        // ajustando os valores dos Select
        formulario.uf = formulario.uf.uf;
        formulario.id_tipo_cadastro_conta = formulario.id_tipo_cadastro_conta.id_tipo_cadastro_conta;
        formulario.id_tipo_conta = formulario.id_tipo_conta.id_tipo_conta;
        formulario.codigo_banco = formulario.codigo_banco.codigo;
        // ajustando os valores com mascara
        formulario.cnpj = formulario.cnpj.replace(/\D/g, '');
        formulario.cep = formulario.cep.replace(/\D/g, '');
        formulario.cpf_administrador = formulario.cpf_administrador.replace(/\D/g, '')
        formulario.celular = formulario.celular.replace(/\D/g, '')
        
        let res = await fetch(path + '/restaurante/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formulario)
        });
        let sucess = await res.ok;

        if (sucess) {
            alert('CADASTRADO COM SUCESSO!');
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
    validarCNPJ = async (event) => {
        let ok = false, msg = '';
        let val = event.target.value.replace(/\D/g, '');
        if (!val) {
            msg = 'Campo obrigatório';
        }
        else if (!this.testarCNPJ(val)) {
            msg = 'CNPJ incorreto';
        }
        else {
            ok = true;
        }

        let newState = Object.assign({}, this.state.validacao);
        newState.cnpj.ok = ok;
        newState.cnpj.msg = msg;
        this.setState({ validacao: newState });

        if (val.length == 14) {
            let res = await fetch(path + '/restaurante/checarSeCNPJExiste', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cnpj: val })
            });
            let json = await res.json();
            if (json.exists) {
                let newState = Object.assign({}, this.state.validacao);
                newState.cnpj.ok = false;
                newState.cnpj.msg = 'Este CNPJ já está cadastrado';
                this.setState({ validacao: newState });
            }
        }
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
        else if(!(/^(?=.*[a-zA-Z])(?=.*[0-9])/).test(val)){
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
    validarCodigoRestaurante = async (event) => {
        let ok = false, msg = '';
        let val = event.target.value;
        if (!val) {
            msg = 'Campo obrigatório';
        }
        else if (val.length < 6) {
            msg = 'Código do restaurante precisar ter 6 ou mais caracteres';
        }
        else {
            ok = true;
        }

        let newState = Object.assign({}, this.state.validacao);
        newState.codigo_restaurante.ok = ok;
        newState.codigo_restaurante.msg = msg;
        this.setState({ validacao: newState });

        if (val.length >= 6) {
            let res = await fetch(path + '/restaurante/checarSeCodigoExiste', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ codigo_restaurante: val })
            });
            let json = await res.json();
            if (json.exists) {
                let newState = Object.assign({}, this.state.validacao);
                newState.codigo_restaurante.ok = false;
                newState.codigo_restaurante.msg = 'Este código já existe';
                this.setState({ validacao: newState });
            }
        }
    }
    validarLogin = async (event) => {
        let ok = false, msg = '';
        let val = event.target.value;
        if (!val) {
            msg = 'Campo obrigatório';
        }
        else if (val.length < 4) {
            msg = 'Login precisar ter 4 ou mais caracteres';
        }
        else {
            ok = true;
        }

        let newState = Object.assign({}, this.state.validacao);
        newState.login.ok = ok;
        newState.login.msg = msg;
        this.setState({ validacao: newState });
    }

    testarCNPJ = (cnpj) => {
        if (cnpj == '') return false;

        if (cnpj.length != 14)
            return false;

        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999")
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
        if (resultado != digitos.charAt(0))
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
        if (resultado != digitos.charAt(1))
            return false;

        return true;
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

                    <MaskedInput
                        value={this.state.formulario.cnpj}
                        onChange={this.formChange}
                        onBlur={this.validarCNPJ}
                        name='cnpj'
                        placeholder='CNPJ'
                        mask={[/[1-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/,]} guide={true}
                    />
                    <span style={{ color: 'red' }}>{this.state.validacao.cnpj.msg}</span>
                    <p></p>

                    <input
                        type='text'
                        placeholder='Nome Fantasia'
                        name='nome_fantasia'
                        onChange={this.formChange}
                        onBlur={this.validarCampoVazio}
                        value={this.state.formulario.nome_fantasia}
                    />
                    <span style={{ color: 'red' }}>{this.state.validacao.nome_fantasia.msg}</span>
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
                    <span style={{ color: 'red' }}>{this.state.validacao.cep.msg}</span>
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
                    <span style={{ color: 'red' }}>{this.state.validacao.logradouro.msg}</span>
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
                    <span style={{ color: 'red' }}>{this.state.validacao.numero.msg}</span>
                    <p></p>

                    <input
                        type='text'
                        placeholder='Complemento'
                        name='complemento'
                        value={this.state.formulario.complemento.msg}
                        onChange={this.formChange}
                    />
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
                    <span style={{ color: 'red' }}>{this.state.validacao.bairro.msg}</span>
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
                    <span style={{ color: 'red' }}>{this.state.validacao.uf.msg}</span>
                    <p></p>

                    <Autosuggest
                        suggestions={this.state.suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={this.getSuggestionValue}
                        renderSuggestion={this.renderSuggestion}
                        inputProps={{
                            type: 'text',
                            placeholder: 'Município',
                            name: 'municipio',
                            value: this.state.formulario.municipio,
                            onChange: this.formChange,
                            onBlur: this.validarCampoVazio,
                            disabled: this.state.formulario.enderecoDisabled
                        }}
                    />

                    <span style={{ color: 'red' }}>{this.state.validacao.municipio.msg}</span>
                    <p></p>

                    <MaskedInput placeholder='Celular'
                        name='celular'
                        value={this.state.formulario.celular}
                        onChange={this.formChange}
                        onBlur={this.validarCelular}
                        mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,]}
                        guide={true}
                    />
                    <span style={{ color: 'red' }}>{this.state.validacao.celular.msg}</span>
                    <p></p>

                    <input
                        type='text'
                        placeholder='E-mail'
                        name='email'
                        value={this.state.formulario.email}
                        onChange={this.formChange}
                        onBlur={this.validarEmail}
                    />
                    <span style={{ color: 'red' }}>{this.state.validacao.email.msg}</span>
                    <p></p>

                    <Select
                        name="id_tipo_cadastro_conta"
                        options={this.state.tipoCadastroConta}
                        getOptionLabel={option => option.tipo_cadastro_conta}
                        getOptionValue={option => option.id_tipo_cadastro_conta}
                        value={this.state.formulario.id_tipo_cadastro_conta}
                        onChange={this.formChangeSelect('id_tipo_cadastro_conta')}
                    />
                    <span style={{ color: 'red' }}>{this.state.validacao.id_tipo_cadastro_conta.msg}</span>
                    <p></p>

                    <Select
                        name="codigo_banco"
                        options={this.state.bancos}
                        getOptionLabel={option => option.nome}
                        getOptionValue={option => option.codigo}
                        value={this.state.formulario.codigo_banco}
                        onChange={this.formChangeSelect('codigo_banco')}
                    />
                    <span style={{ color: 'red' }}>{this.state.validacao.codigo_banco.msg}</span>
                    <p></p>

                    <Select
                        name="id_tipo_conta"
                        options={this.state.tipoConta}
                        getOptionLabel={option => option.tipo_conta}
                        getOptionValue={option => option.id_tipo_conta}
                        value={this.state.formulario.id_tipo_conta}
                        onChange={this.formChangeSelect('id_tipo_conta')}
                    />
                    <span style={{ color: 'red' }}>{this.state.validacao.id_tipo_conta.msg}</span>
                    <p></p>

                    <MaskedInput
                        placeholder='Agência'
                        name='agencia'
                        value={this.state.formulario.agencia}
                        onChange={this.formChange}
                        onBlur={this.validarCampoVazio}
                        mask={[/\d/, /\d/, /\d/, /\d/]}
                    />
                    <span style={{ color: 'red' }}>{this.state.validacao.agencia.msg}</span>
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
                    <span style={{ color: 'red' }}>{this.state.validacao.conta.msg}</span>
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
                    <span style={{ color: 'red' }}>{this.state.validacao.cpf_administrador.msg}</span>
                    <p></p>

                    <input
                        type='text'
                        placeholder='Nome Administrador'
                        name='nome_administrador'
                        onChange={this.formChange}
                        onBlur={this.validarCampoVazio}
                        value={this.state.formulario.nome_administrador}
                    />
                    <span style={{ color: 'red' }}>{this.state.validacao.nome_administrador.msg}</span>
                    <p></p>

                    <input
                        type='text'
                        placeholder='Código Restaurante'
                        name='codigo_restaurante'
                        value={this.state.formulario.codigo_restaurante}
                        onChange={this.formChange}
                        onBlur={this.validarCodigoRestaurante}
                    />
                    <span style={{ color: 'red' }}>{this.state.validacao.codigo_restaurante.msg}</span>
                    <p></p>

                    <input
                        type='text'
                        placeholder='Login'
                        name='login'
                        value={this.state.formulario.login}
                        onChange={this.formChange}
                        onBlur={this.validarLogin}
                    />
                    <span style={{ color: 'red' }}>{this.state.validacao.login.msg}</span>
                    <p></p>

                    <input
                        type='password'
                        placeholder='Senha'
                        name='senha'
                        value={this.state.formulario.senha}
                        onChange={this.formChange}
                        onBlur={this.validarSenha}
                    />
                    <span style={{ color: 'red' }}>{this.state.validacao.senha.msg}</span>
                    <p></p>

                    <button className="btn btn-primary" type='button' onClick={this.cadastrarRestaurante}>Submit</button>

                    <p></p>

                    <a href="http://localhost:3000/Restaurante/showRestaurante">Restaurante Cadastrado</a>
                </form>
            </div>
        )
    }
}

export default SignIn;
