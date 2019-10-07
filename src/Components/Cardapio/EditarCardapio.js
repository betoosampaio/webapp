import React from 'react';
import Table from 'react-bootstrap/Table'
import Select from 'react-select';
import CurrencyFormat from 'react-currency-format';
import CurrencyInput from 'react-currency-input';


class EditarOperador extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            menu: [],
            formulario: {
                nome_produto: '',
                descricao: '',
                preco: '',
                id_menu: '',
                visivel: '',
                promocao: '',
                imagem: '',
                id_produto: 'this.props.location.id_protudo',
            },
        }
    }


    updateOperador = async (event) => {


        let formulario = this.state.formulario;
        formulario.id_menu = formulario.id_menu.id_menu;
        formulario.preco = formulario.preco.replace(',', '.');

        try {
            let res = await fetch('http://localhost:3001/produto/editar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify(this.state.formulario)
            });
            alert('PRODUTO EDITADO COM SUCESSO!');
            window.location.href = "http://localhost:3000/Cardapio/Lista"
        } catch (error) {
            alert('ERRO AO EDITAR');
            console.log(error);
        }



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



    selecionarProduto = async (event) => {

        try {
            let res = await fetch('http://localhost:3001/produto/obter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify({ "id_produto": this.props.location.id_produto })
            });
            let data = await res.json();


            let obj = data[0];
            obj.id_menu = { id_menu: obj.id_menu, ds_menu: obj.ds_menu }
            this.setState({ formulario: obj });



        } catch (error) {

            console.log(error);
        }
    }

    componentDidMount() {
        this.selecionarProduto();
        this.obterMenu();

    }


    formChangeInput = name => value => {
        let formNewState = Object.assign({}, this.state.formulario);
        formNewState[name] = value;
        this.setState({ formulario: formNewState });
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

    formChangeCheck = (event) => {
        let formNewState = Object.assign({}, this.state.formulario);
        formNewState[event.target.name] = event.target.checked ? 1 : 0;
        this.setState({ formulario: formNewState });
    }


    render() {
        return (

            <div>

                <form>
                    <h3>Editar Cardapio</h3>

                    <p></p>
                    <label>NomeProduto</label>
                    <p></p>

                    <input
                        type='text'
                        name='nome_produto'
                        value={this.state.formulario.nome_produto}
                        onChange={this.formChange}
                    />

                    <p></p>
                    <label>Descricao</label>
                    <p></p>

                    <input
                        type='text'
                        name='descricao'
                        value={this.state.formulario.descricao}
                        onChange={this.formChange}
                    />

                    <p></p>
                    <label>Preco</label>
                    <p></p>

                    <CurrencyInput
                        type="text"
                        decimalSeparator=","
                        thousandSeparator="."
                        value={this.state.formulario.preco}
                        name="preco"
                        onChange={this.formChangeInput('preco')}
                    />

                    <p></p>
                    <label>menu</label>
                    <p></p>

                    <Select
                        name="id_menu"
                        options={this.state.id_menu}
                        getOptionLabel={option => option.ds_menu}
                        getOptionValue={option => option.id_menu}
                        value={this.state.formulario.id_menu}
                        onChange={this.formChangeSelect('id_menu')}
                    />

                    <p></p>



                    <input
                        type="checkbox"
                        name='visivel'
                        checked={this.state.formulario.visivel}
                        onChange={this.formChangeCheck} /> Produto visivel


                <p></p>

                    <input
                        type="checkbox"
                        name='promocao'
                        checked={this.state.formulario.promocao}
                        onChange={this.formChangeCheck} />Produto em Promoção

                            <p></p>


                    <p></p>



                    <button class="btn btn-primary" type='button' onClick={this.updateOperador}>Editar</button>

                    <p></p>
                    <a href="/Cardapio/Lista">Voltar</a>


                </form>
            </div>
        )
    }
}

export default EditarOperador