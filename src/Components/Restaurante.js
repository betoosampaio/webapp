import React from 'react';
import Select from 'react-select';

class Restaurante extends React.Component {

    state = {
        bancos: [],
        estados: [],
        municipios: [],
        tipoConta: [],
        tipoCadastroConta: [],
        formulario: {
            cnpj: 0,
            nome_fantasia: '',
            cep: 0,
            logradouro: '',
            numero: 0,
            bairro: '',
            municipio: '',
            uf: '',
            complemento: '',
            celular: 0,
            email: '',
            codigo_banco: 0,
            id_tipo_cadastro_conta: 0,
            id_tipo_conta: 0,
            agencia: 0,
            conta: 0,
            digito: 0,
            cpf_administrador: 0,
            nome_administrador: '',
            login: '',
            senha: '',
        },
    };

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
        console.log(this.state.formulario);

        
        try {
            let res = await fetch('http://localhost:3001/restaurante/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.formulario)
            });
            alert('CADASTRADO COM SUCESSO!');
        } catch (error) {
            alert('ERRO NO CADASTRO');
            console.log(error);
        }
        
    }

    formChange = (event) => {
        let formNewState = Object.assign({}, this.state.formulario);
        formNewState[event.target.name] = event.target.value;
        this.setState({ formulario: formNewState });
    }

    formChangeSelect = name => value => {
        console.log(name);
        console.log(value[name]);
        let formNewState = Object.assign({}, this.state.formulario);
        formNewState[name] = value[name];
        this.setState({ formulario: formNewState });
    }

    componentDidMount() {
        this.obterBancos();
        this.obterEstados();
        this.obterMunicipios();
        this.obtertipoConta();
        this.obtertipoCadastroConta();
    }

    render() {
        return (
            <div>
                <form>
                    <h2>Registrar Restaurante</h2>
                    <input
                        type='text'
                        placeholder='CNPJ'
                        name='cnpj'
                        value={this.state.formulario.cnpj}
                        onChange={this.formChange}
                    />
                    <p></p>
                    <input
                        type='text'
                        placeholder='Nome Fantasia'
                        name='nome_Fantasia'
                        value={this.state.formulario.nome_fantasia}
                        onChange={this.formChange}
                    />
                    <p></p>
                    <input
                        type='text'
                        placeholder='Cep'
                        name='cep'
                        value={this.state.formulario.cep}
                        onChange={this.formChange}
                    />
                    <p></p>
                    <input
                        type='text'
                        placeholder='Logradouro'
                        name='rua'
                        value={this.state.formulario.logradouro}
                        onChange={this.formChange}
                    />
                    <p></p>
                    <input
                        type='text'
                        placeholder='Número'
                        name='numero_endereco'
                        value={this.state.formulario.numero}
                        onChange={this.formChange}
                    />
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
                    />
                    <p></p>
                    <Select
                        name="municipio"
                        options={this.state.municipios}
                        getOptionLabel={option => option.municipio}
                        getOptionValue={option => option.municipio}
                        value={this.state.formulario.cidade}
                        onChange={this.formChangeSelect('municipio')}
                    />
                    <p></p>
                    <Select
                        name="uf"
                        options={this.state.estados}
                        getOptionLabel={option => option.estado}
                        getOptionValue={option => option.uf}
                        value={this.state.formulario.estado}
                        onChange={this.formChangeSelect('uf')}
                    />
                    <p></p>
                    <input
                        type='text'
                        placeholder='Celular'
                        name='celular'
                        value={this.state.formulario.celular}
                        onChange={this.formChange}
                    />
                    <p></p>
                    <input
                        type='text'
                        placeholder='E-mail'
                        name='email'
                        value={this.state.formulario.email}
                        onChange={this.formChange}
                    />
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
                    <Select
                        name="codigo_banco"
                        options={this.state.bancos}
                        getOptionLabel={option => option.nome}
                        getOptionValue={option => option.codigo}
                        value={this.state.formulario.codigo_banco}
                        onChange={this.formChangeSelect('codigo_banco')}
                    />
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
                    <input
                        type='text'
                        placeholder='Agência'
                        name='agencia'
                        value={this.state.formulario.agencia}
                        onChange={this.formChange}
                    />
                    <p></p>
                    <input
                        type='text'
                        placeholder='Conta'
                        name='conta'
                        value={this.state.formulario.conta}
                        onChange={this.formChange}
                    />
                    <p></p>
                    <input
                        type='text'
                        placeholder='Digito'
                        name='digito'
                        value={this.state.formulario.digito}
                        onChange={this.formChange}
                    />
                    <p></p>
                    <input
                        type='text'
                        placeholder='CPF Administrador'
                        name='cpf_administrador'
                        value={this.state.formulario.cpf_administrador}
                        onChange={this.formChange}
                    />
                    <p></p>
                    <input
                        type='text'
                        placeholder='Nome Administrador'
                        name='nome_Administrador'
                        value={this.state.formulario.nome_administrador}
                        onChange={this.formChange}
                    />
                    <p></p>
                    <input
                        type='text'
                        placeholder='Login'
                        name='login'
                        value={this.state.formulario.login}
                        onChange={this.formChange}
                    />
                    <p></p>
                    <input
                        type='text'
                        placeholder='Senha'
                        name='senha'
                        value={this.state.formulario.senha}
                        onChange={this.formChange}
                    />
                    <p></p>
                    <p></p>
                    <button type='button' onClick={this.cadastrarRestaurante}>Submit</button>
                </form>
            </div>
        )
    }
}

export default Restaurante;
