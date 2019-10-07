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

            },
        }
    }
    


    updateRestaurante = async (event) => {

        let formulario = Object.assign({}, this.state.formulario);
     
        formulario.celular = formulario.celular.replace(/\D/g, '')
        
        let res = await fetch(path + '/restaurante/editar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
    
    


    selecionarRestaurante = async (event) => {

        try {
            let res = await fetch(pathWeb + '/restaurante/obter', {
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



    componentDidMount() {
        this.selecionarRestaurante();
    }






    formChange = (event) => {
        let formNewState = Object.assign({}, this.state.formulario);
        formNewState[event.target.name] = event.target.value;
        this.setState({ formulario: formNewState });
    }


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
                    <input
                        value={this.state.formulario.cep}
                    />

                    <p></p>
                    <label>Logradouro</label>
                    <p></p>
                    <input
                        value={this.state.formulario.logradouro}
                    />

                    <p></p>
                    <label>Número</label>
                    <p></p>
                    <input
                        value={this.state.formulario.numero}
                    />

                    <p></p>
                    <label>Complemento</label>
                    <p></p>
                    <input
                        value={this.state.formulario.complemento}
                    />

                    <p></p>
                    <label>Bairro</label>
                    <p></p>
                    <input
                        value={this.state.formulario.bairro}
                    />

                    <p></p>
                    <label>Uf</label>
                    <p></p>
                    <input
                        value={this.state.formulario.uf}
                    />

                    <p></p>
                    <label>Municipio</label>
                    <p></p>
                    <input
                        value={this.state.formulario.municipio}
                    />

                    <p></p>
                    <label>celular</label>
                    <p></p>
                    <input
                        type='text'
                        name='celular'
                        value={this.state.formulario.celular}
                        onChange={this.formChange}
                    />

                    <p></p>
                    <label>Email</label>
                    <p></p>
                    <input
                        value={this.state.formulario.email}
                    />

                    <p></p>
                    <label>CodigodoBanco</label>
                    <p></p>
                    <input
                        value={this.state.formulario.codigo_banco}
                    />



                    <p></p>
                    <label>Banco</label>
                    <p></p>
                    <input
                        value={this.state.formulario.id_tipo_cadastro_conta}
                    />

                    <p></p>
                    <label>TipodeConta</label>
                    <p></p>
                    <input
                        value={this.state.formulario.id_tipo_cadastro_conta}
                    />

                    <p></p>
                    <label>Agencia</label>
                    <p></p>
                    <input
                        value={this.state.formulario.agencia}
                    />

                    <p></p>
                    <label>Conta</label>
                    <p></p>
                    <input
                        value={this.state.formulario.conta}
                    />

                    <p></p>
                    <label>Digito</label>
                    <p></p>
                    <input
                        value={this.state.formulario.digito}
                    />

                    <p></p>
                    <label>Cpf</label>
                    <p></p>
                    <input
                        value={this.state.formulario.cpf_administrador}
                    />

                    <p></p>
                    <label>NomeAdministrador</label>
                    <p></p>
                    <input
                        value={this.state.formulario.nome_administrador}
                    />

                    <p></p>
                    <label>Senha</label>
                    <tr>{this.state.formulario.senha}</tr>


                    <button class="btn btn-primary" type='button' onClick={this.updateRestaurante}>Editar</button>

                </form>
            </div>


        )
    }
}


export default EditarRestaurante;