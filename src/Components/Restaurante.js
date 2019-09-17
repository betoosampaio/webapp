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
            agencia: 0,
            conta: '',
            digito: '',
            cpf_administrador: '',
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

    formChangeSelect = (name, propName) => value => {
        let formNewState = Object.assign({}, this.state.formulario);
        formNewState[name] = value[propName];
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
        const {selected_banco} = this.state.formulario.codigo_banco;
        const {selected_uf} = this.state.formulario.uf;
        const {selected_municipio} = this.state.formulario.municipio;
        const {selected_tipoConta} = this.state.formulario.id_tipo_conta;
        const {selected_tipoCadastroConta} = this.state.formulario.id_tipo_cadastro_conta;

        return (
            <div>
                <form>

                    <h2>Registrar Restaurante</h2>

                    <MaskedInput
                        value={this.state.formulario.cnpj}
                        onChange={this.formChange}
                        name='cnpj'
                        placeholder='CNPJ'
                        mask={[/[1-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/,]} guide={true}
                    />

                    <p></p>

                    <input
                        type='text'
                        placeholder='Nome Fantasia'
                        name='nome_Fantasia'
                        onChange={this.formChange}
                        value={this.state.formulario.nome_fantasia}
                    />

                    <p></p>

                    <MaskedInput
                        value={this.state.formulario.cep}
                        onChange={this.formChange}
                        name='cep'
                        placeholder='Cep'
                        mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/,]}
                        guide={true}
                    />

                    <p></p>

                    <input
                        type='text'
                        placeholder='Logradouro'
                        name='rua'
                        onChange={this.formChange}
                        value={this.state.formulario.logradouro}
                    />

                    <p></p>

                    <input
                        type='text'
                        placeholder='Número'
                        name='numero_endereco'
                        onChange={this.formChange}
                        value={this.state.formulario.numero}
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
                        value={selected_municipio}
                        onChange={this.formChangeSelect('municipio', 'municipio')}
                    />

                    <p></p>

                    

                    <Select
                        name="uf"
                        options={this.state.estados}
                        getOptionLabel={option => option.estado}
                        getOptionValue={option => option.uf}
                        value={selected_uf}
                        onChange={this.formChangeSelect('uf', 'uf')}
                    />

                    <p></p>


                    <MaskedInput placeholder='Celular'
                        name='celular'
                        value={this.state.formulario.celular}
                        onChange={this.formChange} mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,]} guide={true} />


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
                        value={selected_tipoConta}
                        onChange={this.formChangeSelect('id_tipo_cadastro_conta', 'id_tipo_cadastro_conta')}
                    />

                    <p></p>

                    <Select
                        name="codigo_banco"
                        options={this.state.bancos}
                        getOptionLabel={option => option.nome}
                        getOptionValue={option => option.codigo}
                        value={selected_banco}
                        onChange={this.formChangeSelect('codigo_banco', 'codigo')}
                    />

                    <p></p>

                    <Select
                        name="id_tipo_conta"
                        options={this.state.tipoConta}
                        getOptionLabel={option => option.tipo_conta}
                        getOptionValue={option => option.id_tipo_conta}
                        value={selected_tipoCadastroConta}
                        onChange={this.formChangeSelect('id_tipo_conta', 'id_tipo_conta')}
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


                    <input
                        id="digito"
                        size="1"
                        maxLength="1"
                        type='text'
                        name='digito'
                        value={this.state.formulario.digito}
                        onChange={this.formChange}
                    />

                    <p></p>

                    <MaskedInput
                        onChange={this.formChange}
                        value={this.state.formulario.cpf_administrador}
                        placeholder='CPF Administrador'
                        name='cpf_administrador'
                        mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/,]}
                        guide={true}
                    />


                    <p></p>

                    <input
                        type='text'
                        placeholder='Nome Administrador'
                        name='nome_Administrador'
                        onChange={this.formChange}
                        value={this.state.formulario.nome_administrador}
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
                    <p></p>
                    <a href="http://localhost:3000/showRestaurante">Restaurante Cadastrado</a>

                </form>
            </div>
        )
    }
}

export default Restaurante;
