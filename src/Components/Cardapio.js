import React from 'react';
import Select from 'react-select';

import MaskedInput from 'react-text-mask'

class Cardapio extends React.Component {

    state = {
        
        formulario: {
            nome_Produto: '',
            descricao: '',
            preco: '',
            menu: '',
            visivel: '',
            promocao: '',
            imagem: '',
      
        },
    };

   

    cadastrarCardapio = async (event) => {
        console.log(this.state.formulario);

        
        try {
            let res = await fetch('http://localhost:3001/cardapio/insert', {
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

                                    <h2>Registrar Cardápio</h2>



                    <input
                        type='text'
                        placeholder='Nome Produto'
                        name='nome_Produto'
                        value={this.state.formulario.nome_Produto}
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
                        name='menu'
                        value={this.state.formulario.menu}
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

                    <button type='button' onClick={this.cadastrarCardapio}>Submit</button>

                </form>
            </div>
        )
    }
}

export default Cardapio;
