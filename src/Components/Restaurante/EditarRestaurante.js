import React from 'react';
import Select from 'react-select';
import Table from 'react-bootstrap/Table'
import MaskedInput from 'react-text-mask'
import { Link } from 'react-router-dom'
import Autosuggest from 'react-autosuggest';
const path = process.env.REACT_APP_SRV_PATH;



class EditarRestaurante extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            estados: [],
            formulario: {
                cnpj: '',

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
                        value={this.state.formulario.celular}
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
                    value= {this.state.formulario.digito}
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
                    <label>login</label>
                    <p></p>
                    <input
                    value={this.state.formulario.login}
                    />

                    <p></p>
                    <label>Senha</label>
                    <tr>{this.state.formulario.senha}</tr>


                </form>
            </div>


        )
    }
}


export default EditarRestaurante;