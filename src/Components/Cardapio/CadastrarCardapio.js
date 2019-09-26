import React from 'react';
import Select from 'react-select';

import MaskedInput from 'react-text-mask'

class Cardapio extends React.Component {

    state = {
        restaurantes: [],
        formulario: {
            nome_produto: '',
            descricao: '',
            preco: '',
            id_menu: '',
            visivel: '',
            promocao: '',
            imagem: '',
            id_restaurante:'',
      
        },
    };
 
   

    cadastrarCardapio = async (event) => {
        console.log(this.state.formulario);


        let formulario = this.state.formulario;
        // ajustando os valores dos Select
        formulario.id_restaurante = formulario.id_restaurante.id_restaurante;
     
 
        
        try {
            let res = await fetch('http://localhost:3001/cardapio/cadastrar', {
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

                                    <h2>Registrar Cardápio</h2>



                    <input
                        type='text'
                        placeholder='Nome Produto'
                        name='nome_produto'
                        value={this.state.formulario.nome_produto}
                        onChange={this.formChange}
                    />

                    <p></p>

                    <input
                        type='text'
                        placeholder='Descrição do Produto'
                        name='descricao'
                        value={this.state.formulario.descricao}
                        onChange={this.formChange}
                    />

                    <p></p>

                    
                    <input
                        type='text'
                        placeholder='preco'
                        name='preco'
                        value={this.state.formulario.preco}
                        onChange={this.formChange}
                    />

                    <p></p>

                    <input
                        type='text'
                        placeholder='menu'
                        name='id_menu'
                        value={this.state.formulario.id_menu}
                        onChange={this.formChange}
                    />

                    <p></p>


                    <input
                        type='text'
                        placeholder='visivel'
                        name='visivel'
                        value={this.state.formulario.visivel}
                        onChange={this.formChange}
                    />

                    <p></p>

                    <input
                        type='text'
                        placeholder='Promoção'
                        name='promocao'
                        value={this.state.formulario.promocao}
                        onChange={this.formChange}
                    />

                    <p></p>

                   <input type='file' name='imagem'/>

                    <p></p>

                    <p></p>

                    <button class="btn btn-primary" type='button' onClick={this.cadastrarCardapio}>Cadastrar Cardápio</button>
                    <p></p>
                    <a href="/App/Cardapio/Lista">Voltar</a>

                </form>
            </div>
        )
    }
}

export default Cardapio;
