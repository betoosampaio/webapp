import React from 'react';
import Select from 'react-select';
import MaskedInput from 'react-text-mask'

class Restaurante extends React.Component {
    state = {
        bancos: [],
        estados: [],
        municipios: [],
        tipoConta: [],
        tipoCadastroConta: [],
        formulario: {
            cnpj: '',
            nome_fantasia: '',
            cep: '',
            logradouro: '',
            numero: '',
            bairro: '',
            municipio: '',
            uf: '',
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
            login: '',
            senha: '',
        },
        validacao: {}
    };
    componentDidMount() {
        this.obterBancos();
        this.obterEstados();
        this.obterMunicipios();
        this.obtertipoConta();
        this.obtertipoCadastroConta();
    }
    obterBancos = async function () {
        let res = await fetch('http://localhost:3001/tabelasVariaveis/banco/selectAll', {
            method: 'POST',
        });
        this.setState({ bancos: await res.json() });
    }
    obterEstados = async function () {
        let res = await fetch('http://localhost:3001/tabelasVariaveis/estado/selectAll', {
            method: 'POST',
        });
        this.setState({ estados: await res.json() });
    }
    obterMunicipios = async function () {
        let res = await fetch('http://localhost:3001/tabelasVariaveis/municipio/selectAll', {
            method: 'POST',
        });
        this.setState({ municipios: await res.json() });
    }
    obtertipoConta = async function () {
        let res = await fetch('http://localhost:3001/tabelasVariaveis/tipoConta/selectAll', {
            method: 'POST',
        });
        this.setState({ tipoConta: await res.json() });
    }
    obtertipoCadastroConta = async function () {
        let res = await fetch('http://localhost:3001/tabelasVariaveis/tipoCadastroConta/selectAll', {
            method: 'POST',
        });
        this.setState({ tipoCadastroConta: await res.json() });
    }
    cadastrarRestaurante = async (event) => {
        //console.log(this.state.formulario);

        let res = await fetch('http://localhost:3001/restaurante/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.formulario)
        });
        let sucess = await res.ok;

        if (sucess) {
            alert('CADASTRADO COM SUCESSO!');
        } else {
            let err = await res.json();
            alert('ERRO NO CADASTRO: ' + err.msg);
        }
    }
    formChange = (event) => {
        let formNewState = Object.assign({}, this.state.formulario);
        formNewState[event.target.name] = event.target.value;
        this.setState({ formulario: formNewState });
    }
    formChangeSelect = (name, propName) => value => {
        let formNewState = Object.assign({}, this.state.formulario);
        formNewState[name] = value[propName];
        this.setState({ formulario: formNewState });
    }
    validarCampoVazio = (event) => {
        let msg = '';

        if (!event.target.value)
            msg = 'Campo obrigatório';

        let newState = Object.assign({}, this.state.validacao);
        newState[event.target.name] = msg;
        this.setState({ validacao: newState });
    }
    validarCNPJ = (event) => {
        let msg = '';
        let val = event.target.value.replace(/\D/g, '');
        if (!val) {
            msg = 'Campo obrigatório';
        }
        else if (val.length < 14) {
            msg = 'CNPJ incompleto';
        }
        let newState = Object.assign({}, this.state.validacao);
        newState['cnpj'] = msg;
        this.setState({ validacao: newState });
    }
    validarCelular = (event) => {
        let msg = '';
        let val = event.target.value.replace(/\D/g, '');
        if (!val) {
            msg = 'Campo obrigatório';
        }
        else if (val.length < 11) {
            msg = 'Celular incompleto';
        }
        let newState = Object.assign({}, this.state.validacao);
        newState['celular'] = msg;
        this.setState({ validacao: newState });
    }
    validarEmail = (event) => {
        let msg = '';
        let val = event.target.value;
        if (!val) {
            msg = 'Campo obrigatório';
        }
        else if (!/.+@.+\..+/.test(val)) {
            msg = 'Email incorreto';
        }

        let newState = Object.assign({}, this.state.validacao);
        newState['email'] = msg;
        this.setState({ validacao: newState });
    }
    validarCPF = (event) => {
        let msg = '';
        let val = event.target.value.replace(/\D/g, '');
        if (!val) {
            msg = 'Campo obrigatório';
        }
        else if (!this.testarCPF(val)) {
            msg = 'CPF incorreto';
        }

        let newState = Object.assign({}, this.state.validacao);
        newState['cpf_administrador'] = msg;
        this.setState({ validacao: newState });
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
    validarSenha = (event) => {
        let msg = '';
        let val = event.target.value;
        if (!val) {
            msg = 'Campo obrigatório';
        }
        else if (val.length < 6) {
            msg = 'Senha deve conter 6 dígitos';
        }

        let newState = Object.assign({}, this.state.validacao);
        newState['senha'] = msg;
        this.setState({ validacao: newState });
    }
    validarCEP = async (event) => {
        let msg = '';
        let val = event.target.value.replace(/\D/g, '');
        if (!val) {
            msg = 'Campo obrigatório';
        }
        else if (val.length < 8) {
            msg = 'CEP Incompleto';
        }

        let newState = Object.assign({}, this.state.validacao);
        newState['cep'] = msg;
        this.setState({ validacao: newState });

        if(val.length == 8){
            let res = await fetch('http://viacep.com.br/ws/' + val + '/json/');
            let dados = await res.json();
            if (!dados['erro']) {
                let formNewState = Object.assign({}, this.state.formulario);
                formNewState['logradouro'] = dados.logradouro;
                formNewState['bairro'] = dados.bairro;                
                formNewState['munincipio'] = dados.localidade;     
                formNewState['uf'] = dados.uf;      
                this.setState({ formulario: formNewState });
            }
            else{
                let formNewState = Object.assign({}, this.state.formulario);
                formNewState['logradouro'] = '';
                formNewState['bairro'] = '';                
                formNewState['munincipio'] = '';
                formNewState['uf'] = '';                
                this.setState({ formulario: formNewState });
            }
        }
    }

    render() {
        const { selected_banco } = this.state.formulario.codigo_banco;
        const { selected_uf } = this.state.formulario.uf;
        const { selected_municipio } = this.state.formulario.municipio;
        const { selected_tipoConta } = this.state.formulario.id_tipo_conta;
        const { selected_tipoCadastroConta } = this.state.formulario.id_tipo_cadastro_conta;

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
                    <span style={{ color: 'red' }}>{this.state.validacao.cnpj}</span>
                    <p></p>

                    <input
                        type='text'
                        placeholder='Nome Fantasia'
                        name='nome_fantasia'
                        onChange={this.formChange}
                        onBlur={this.validarCampoVazio}
                        value={this.state.formulario.nome_fantasia}
                    />
                    <span style={{ color: 'red' }}>{this.state.validacao.nome_fantasia}</span>
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
                    <span style={{ color: 'red' }}>{this.state.validacao.cep}</span>
                    <p></p>

                    <input
                        type='text'
                        placeholder='Logradouro'
                        name='logradouro'
                        onChange={this.formChange}
                        onBlur={this.validarCampoVazio}
                        value={this.state.formulario.logradouro}
                    />
                    <span style={{ color: 'red' }}>{this.state.validacao.logradouro}</span>
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
                    <span style={{ color: 'red' }}>{this.state.validacao.numero}</span>
                    <p></p>

                    <input
                        type='text'
                        placeholder='Complemento'
                        name='complemento'
                        value={this.state.formulario.complemento}
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
                    />
                    <span style={{ color: 'red' }}>{this.state.validacao.bairro}</span>
                    <p></p>

                    <Select
                        name="uf"
                        options={this.state.estados}
                        getOptionLabel={option => option.estado}
                        getOptionValue={option => option.uf}
                        value={selected_uf}
                        onChange={this.formChangeSelect('uf', 'uf')}
                    />
                    <span style={{ color: 'red' }}>{this.state.validacao.uf}</span>
                    <p></p>

                    <Select
                        name="municipio"
                        options={this.state.municipios}
                        getOptionLabel={option => option.municipio}
                        getOptionValue={option => option.municipio}
                        value={selected_municipio}
                        onChange={this.formChangeSelect('municipio', 'municipio')}
                    />
                    <span style={{ color: 'red' }}>{this.state.validacao.municipio}</span>
                    <p></p>

                    <MaskedInput placeholder='Celular'
                        name='celular'
                        value={this.state.formulario.celular}
                        onChange={this.formChange}
                        onBlur={this.validarCelular}
                        mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,]}
                        guide={true}
                    />
                    <span style={{ color: 'red' }}>{this.state.validacao.celular}</span>
                    <p></p>

                    <input
                        type='text'
                        placeholder='E-mail'
                        name='email'
                        value={this.state.formulario.email}
                        onChange={this.formChange}
                        onBlur={this.validarEmail}
                    />
                    <span style={{ color: 'red' }}>{this.state.validacao.email}</span>
                    <p></p>

                    <Select
                        name="id_tipo_cadastro_conta"
                        options={this.state.tipoCadastroConta}
                        getOptionLabel={option => option.tipo_cadastro_conta}
                        getOptionValue={option => option.id_tipo_cadastro_conta}
                        value={selected_tipoConta}
                        onChange={this.formChangeSelect('id_tipo_cadastro_conta', 'id_tipo_cadastro_conta')}
                    />
                    <span style={{ color: 'red' }}>{this.state.validacao.id_tipo_cadastro_conta}</span>
                    <p></p>

                    <Select
                        name="codigo_banco"
                        options={this.state.bancos}
                        getOptionLabel={option => option.nome}
                        getOptionValue={option => option.codigo}
                        value={selected_banco}
                        onChange={this.formChangeSelect('codigo_banco', 'codigo')}
                    />
                    <span style={{ color: 'red' }}>{this.state.validacao.codigo_banco}</span>
                    <p></p>

                    <Select
                        name="id_tipo_conta"
                        options={this.state.tipoConta}
                        getOptionLabel={option => option.tipo_conta}
                        getOptionValue={option => option.id_tipo_conta}
                        value={selected_tipoCadastroConta}
                        onChange={this.formChangeSelect('id_tipo_conta', 'id_tipo_conta')}
                    />
                    <span style={{ color: 'red' }}>{this.state.validacao.id_tipo_conta}</span>
                    <p></p>

                    <MaskedInput
                        placeholder='Agência'
                        name='agencia'
                        value={this.state.formulario.agencia}
                        onChange={this.formChange}
                        mask={[/\d/, /\d/, /\d/, /\d/]}
                    />
                    <span style={{ color: 'red' }}>{this.state.validacao.agencia}</span>
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
                        mask={[/\d/, /\d/]}
                        guide={false}
                    />
                    <span style={{ color: 'red' }}>{this.state.validacao.conta}</span>
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
                    <span style={{ color: 'red' }}>{this.state.validacao.cpf_administrador}</span>
                    <p></p>

                    <input
                        type='text'
                        placeholder='Nome Administrador'
                        name='nome_administrador'
                        onChange={this.formChange}
                        onBlur={this.validarCampoVazio}
                        value={this.state.formulario.nome_administrador}
                    />
                    <span style={{ color: 'red' }}>{this.state.validacao.nome_administrador}</span>
                    <p></p>

                    <input
                        type='text'
                        placeholder='Login'
                        name='login'
                        value={this.state.formulario.login}
                        onChange={this.formChange}
                    />
                    <span style={{ color: 'red' }}>{this.state.validacao.login}</span>
                    <p></p>

                    <input
                        type='password'
                        placeholder='Senha'
                        name='senha'
                        value={this.state.formulario.senha}
                        onChange={this.formChange}
                        onBlur={this.validarSenha}
                    />
                    <span style={{ color: 'red' }}>{this.state.validacao.senha}</span>
                    <p></p>

                    <button type='button' onClick={this.cadastrarRestaurante}>Submit</button>
                    <p></p>

                    <a href="http://localhost:3000/showRestaurante">Restaurante Cadastrado</a>
                </form>
            </div>
        )
    }
}

export default Restaurante;
