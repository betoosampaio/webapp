import React from 'react';
import Select from 'react-select';

import MaskedInput from 'react-text-mask'

class Operador extends React.Component {

    state = {
        
        formulario: {
            nome_Operador: '',
            perfil: '',
            login_Operador: '',
            senha_Operador: '',
      
        },
    };

   

    cadastrarOperador = async (event) => {
        console.log(this.state.formulario);

        
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
        console.log(name);
        console.log(value[name]);
        let formNewState = Object.assign({}, this.state.formulario);
        formNewState[name] = value[name];
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

                    <button type='button' onClick={this.cadastrarOperador}>Submit</button>

                </form>
            </div>
        )
    }
}

export default Operador;
