import React from 'react';
import Select from 'react-select';
import MaskedInput from 'react-text-mask'

class Operador extends React.Component {

    state = {
        restaurantes: [],

            formulario: {
            nome_Operador: '',
            perfil: '',
            login_Operador: '',
            senha_Operador: '',
            id_restaurante:'',

        },
    };
    componentDidMount() {
        this.obterIdRestaurantes();
 
    }

    obterIdRestaurantes = async function () {
        let res = await fetch('http://localhost:3001/restaurante/selectAll', {
            method: 'POST',
        });
        this.setState({ restaurantes: await res.json() });
    }


    cadastrarOperador = async (event) => {
        console.log(this.state.formulario);

        let formulario = this.state.formulario;
        // ajustando os valores dos Select
        formulario.id_restaurante = formulario.id_restaurante.id_restaurante;
     

        try {
            let res = await fetch('http://localhost:3001/operador/insert', {
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
        let formNewState = Object.assign({}, this.state.formulario);
        formNewState[name] = value;
        this.setState({ formulario: formNewState });
    }

    


    render() {
        return (
            <div>
                <form>

                                    <h2>Registrar Operador</h2>



                    <input
                        type='text'
                        placeholder='Nome Operador'
                        name='nome_Operador'
                        value={this.state.formulario.nome_Operador}
                        onChange={this.formChange}
                    />
                       <p></p>

                       <Select
                        name="id_restaurante"
                        options={this.state.restaurantes}
                        getOptionLabel={option => option.nome_fantasia}
                        getOptionValue={option => option.id_restaurante}
                        value={this.state.formulario.restaurante}
                        onChange={this.formChangeSelect('id_restaurante')}
                        />
                   
                 

                    <p></p>

                    <input
                        type='text'
                        placeholder='Perfil'
                        name='perfil'
                        value={this.state.formulario.perfil}
                        onChange={this.formChange}
                    />

                    <p></p>

                    
                    <input
                        type='text'
                        placeholder='Login Operador'
                        name='login_Operador'
                        value={this.state.formulario.login_Operador}
                        onChange={this.formChange}
                    />

                    <p></p>

                    <input
                        type='text'
                        placeholder='Senha'
                        name='senha_Operador'
                        value={this.state.formulario.senha_Operador}
                        onChange={this.formChange}
                    />

                    <p></p>

                    <p></p>

                    <button class="btn btn-primary" type='button' onClick={this.cadastrarOperador}>Submit</button>
                    <p></p>
                    <a href="http://localhost:3000/Operador/showOperador">Operador Cadastrado</a>

                </form>
            </div>
        )
    }
}

export default Operador;
