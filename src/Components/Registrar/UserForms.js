import React, { Component } from 'react'
import DadosUsuario from "./DadosUsuario"
import DadosRestaurante from "./DadosRestaurante"
import DadosBancario from "./DadosBancario"
import DadosLogin from "./DadosLogin"
import Confirm from './Confirm'
import Success from './Success'

const path = process.env.REACT_APP_SRV_PATH;
export class UserForms extends Component {
    state = {
        step: 1,
        bancos: [],
        estados: [],
        municipios: [],
        tipoConta: [],
        tipoCadastroConta: [],
        suggestions: [],
        cnpj: '',
        razao_social: '',
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
        nome_restaurante: '',
        login: '',
        senha: '',
        enderecoDisabled: false,

};



cadastrarRestaurante = async (event) => {



    let formulario = Object.assign({}, this.state);
   
    let res = await fetch(path + '/restaurante/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formulario)
    });
    let sucess = await res.ok;

    if (sucess) {
        alert('RESTAURANTE CADASTRADO COM SUCESSO!');
        window.location.href = "pathWeb +/Login"
    } else {
        let err = await res.json();
        alert('ERRO NO CADASTRO: ' + err.msg);
    }
}


//proceed to next step

nextStep = () => {
    const { step } = this.state//here we are pulling and assigin the state of step to the vaiable
    this.setState({
        step: step + 1
    })
}

//goback to previous page

prevStep = () => {
    const { step } = this.state//here we are pulling and assigin the state of step to the vaiable
    this.setState({
        step: step - 1
    })
}

//handle fields change
handleChange = input => e => {
    this.setState({
        [input]: e.target.value
    })
    if (input.length > 0) {
        //debugger
        console.log("hey")
    }
    else {
        console.log("hello")
    }
}
render() {
    const { step } = this.state
    const { cnpj, razao_social, cep, logradouro, numero, bairro, municipio, uf, complemento, celular, email, codigo_banco, id_tipo_cadastro_conta, id_tipo_conta, agencia, conta, digito, cpf_administrador, nome_administrador, codigo_restaurante, nome_restaurante, login, senha } = this.state
    const values = { cnpj, razao_social, cep, logradouro, numero, bairro, municipio, uf, complemento, celular, email, codigo_banco, id_tipo_cadastro_conta, id_tipo_conta, agencia, conta, digito, cpf_administrador, nome_administrador, codigo_restaurante, nome_restaurante, login, senha }
    switch (step) {
        case 1: return (
            <DadosUsuario
                nextStep={this.nextStep}
                validarCampoVazio={this.validarCampoVazio}
                handleChange={this.handleChange}
                values={values} />
        )
        case 2: return (
            <DadosRestaurante
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                values={values}
            />
        )
        case 3: return (
            <DadosBancario
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                values={values}
            />
        )
        case 4: return (
            <DadosLogin
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                cadastrar={this.cadastrar}
                handleChange={this.handleChange}
                values={values}
            />
        )
        case 5: return (
            <Confirm
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                cadastrarRestaurante={this.cadastrarRestaurante}
                values={values}
            />
        )
        case 4: return (
            <Success />
        )
        default: return true
    }
}
}
//rce is for creat a sample form
export default UserForms
