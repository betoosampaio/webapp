import React from 'react';
import Select from 'react-select';
import Table from 'react-bootstrap/Table'
import MaskedInput from 'react-text-mask'
import { Link } from 'react-router-dom'



class EditarRestaurante extends React.Component {

    constructor(props) {
        super(props);
                  
        this.state = { 
           
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
    }
}



selecionarRestaurante = async (event) => {
       
    try {
        let res = await fetch('http://localhost:3001/restaurante/obter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify({"id_restaurante":  this.props.location.id_restaurante})
        });
       let data = await res.json();
               
       let obj = data[0];
       this.setState({ formulario: obj});
       
       
    } catch (error) {
        
        console.log(error);
    }       
}



componentDidMount() {
    this.selecionarRestaurante();
}


render() {
    return (

        <div>

          
          

<form>
                    <h3>Editar Restaurante</h3>

                <p></p>

        <label>CNPJ</label>

        <p></p>
                
             <MaskedInput
              name='nome_operador'
              value={this.state.formulario.cnpj}
              mask={[/[1-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/,]} guide={true}
              />

        <p></p>

        <label>Nome Fantasia</label>

        <p></p>

            <input
            type='text'
            name='nome_operador'
            value={this.state.formulario.nome_fantasia}
            />

<p></p>

        <label>Cep</label>
        <p></p>
                <MaskedInput
                        onChange={this.formChange}
                        onBlur={this.validarCEP}
                        name='cep'
                        value={this.state.formulario.cep}
                        mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                        guide={true}
                />
                  

<p></p>

<label>Rua</label>

<p></p>

    <input
    type='text'
    name='nome_operador'
    value={this.state.formulario.logradouro}
    />



<p></p>

<label>Número</label>

<p></p>

    <input
    type='text'
    name='nome_operador'
    value={this.state.formulario.numero}
    />

    
<p></p>

<label>Complemento</label>

<p></p>

    <input
    type='text'
    name='nome_operador'
    value={this.state.formulario.complemento}
    />

<p></p>

<label>Complemento</label>

<p></p>

    <input
    type='text'
    name='nome_operador'
    value={this.state.formulario.celular}
    />

<p></p>

<label>email</label>

<p></p>

    <input
    type='text'
    name='nome_operador'
    value={this.state.formulario.email}
    />

    




















            <p></p>

            <button class="btn btn-primary" type='button' onClick={this.updateOperador}>Editar</button>


</form>





        </div>
    )
}
}


export default EditarRestaurante;