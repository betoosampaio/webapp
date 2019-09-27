import React from 'react';
import Select from 'react-select';
import MaskedInput from 'react-text-mask'

class CadastrarOperador extends React.Component {

    state = { 
        perfil: [],
            formulario: {
            nome_operador: '',
            id_perfil: '',
            login_operador: '',
            senha_operador: '',
    
        },
    };

    componentDidMount() {
        this.obterPerfil();
 
    }

    obterPerfil = async function () {
        let res = await fetch('http://localhost:3001/perfil/listar', {
            method: 'POST',
            headers: {
                'token': localStorage.getItem('token')
            },
        });
        this.setState({ id_perfil: await res.json() });
    }


    cadastrarOperador = async (event) => {
        console.log(this.state.formulario);

        let formulario = this.state.formulario;
        formulario.id_perfil = formulario.id_perfil.id_perfil;
        try {
            let res = await fetch('http://localhost:3001/operador/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
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
                        name='nome_operador'
                        value={this.state.formulario.nome_operador}
                        onChange={this.formChange}
                    />
                       <p></p>


                        <Select
                        name="id_perfil"
                        options={this.state.id_perfil}
                        getOptionLabel={option => option.tipo_perfil}
                        getOptionValue={option => option.id_perfil}
                        value={this.state.formulario.perfil}
                        onChange={this.formChangeSelect('id_perfil')}
                        />

                    <p></p>

                    
                    <input
                        type='text'
                        placeholder='Login Operador'
                        name='login_operador'
                        value={this.state.formulario.login_operador}
                        onChange={this.formChange}
                    />

                    <p></p>

                    <input
                        type='text'
                        placeholder='Senha'
                        name='senha_operador'
                        value={this.state.formulario.senha_operador}
                        onChange={this.formChange}
                    />

                    <p></p>

                    <p></p>

                    <button class="btn btn-primary" type='button' onClick={this.cadastrarOperador}>Cadastrar Operador</button>
                    <p></p>
                    <a href="/App/Operador/Lista">Voltar</a>

                </form>
            </div>
        )
    }
}

export default CadastrarOperador;
