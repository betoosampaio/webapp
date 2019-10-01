import React from 'react';
import Select from 'react-select';

import MaskedInput from 'react-text-mask'

class Cardapio extends React.Component {

    state = {
        menu: [],
        formulario: {
            nome_produto: '',
            descricao: '',
            preco: '',
            id_menu: '',
            visivel: '1',
            promocao: '0',
            imagem: '',
              
        },
    };
 
    componentDidMount() {
        this.obterMenu();
 
    }

    obterMenu = async function () {
        let res = await fetch('http://localhost:3001/menu/listar', {
            method: 'POST',
            headers: {
                'token': localStorage.getItem('token')
            },
        });
        this.setState({ id_menu: await res.json() });
    }


    cadastrarProduto = async (event) => {
        console.log(this.state.formulario);
        
        let formulario = this.state.formulario;
        // ajustando os valores dos Select
        formulario.id_menu = formulario.id_menu.id_menu;
             
        try {
            let res = await fetch('http://localhost:3001/produto/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify(this.state.formulario)
            });
            alert('PRODUTO CADASTRADO COM SUCESSO!');
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

                    <Select
                        name="id_menu"
                        options={this.state.id_menu}
                        getOptionLabel={option => option.ds_menu}
                        getOptionValue={option => option.id_menu}
                        value={this.state.formulario.menu}
                        onChange={this.formChangeSelect('id_menu')}
                        />

             

            

                    <p></p>


                    <input 
                        type="checkbox"   
                        name='promocao'
                        value='1'
                        onChange={this.formChange} />Produto em Promoção


                    <p></p>

                   <input type='file' name='imagem'/>

                    <p></p>

                    <p></p>

                    <button class="btn btn-primary" type='button' onClick={this.cadastrarProduto}>Cadastrar Cardápio</button>
                    <p></p>
                    <a href="/App/Cardapio/Lista">Voltar</a>

                </form>
            </div>
        )
    }
}

export default Cardapio;
