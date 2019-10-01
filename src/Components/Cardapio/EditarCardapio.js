import React from 'react';
import Table from 'react-bootstrap/Table'
import Select from 'react-select';


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
            id_produto:'this.props.location.id_protudo',
        },
    }
}


    updateOperador = async (event) => {

        
        let formulario = this.state.formulario;
        formulario.id_menu = formulario.id_menu.id_menu;

        
             try {
            let res = await fetch('http://localhost:3001/produto/editar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify(this.state.formulario)
            });
            alert('OPERADOR EDITADO COM SUCESSO!');
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
                body: JSON.stringify({"id_produto":  this.props.location.id_produto})
            });
           let data = await res.json();
          console.log(data);
           this.setState({ formulario: data[0]});
           
           
        } catch (error) {
            
            console.log(error);
        }       
    }

    componentDidMount() {
        this.selecionarProduto();
        this.obterMenu();
 
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
                    <h3>Editar Operadores</h3>

        <p></p>

            <input
              type='text'
              name='nome_produto'
              value={this.state.formulario.nome_produto}
              onChange={this.formChange}
            />

        <p></p>

            <input
              type='text'
              name='descricao'
              value={this.state.formulario.descricao}
              onChange={this.formChange}
            />

        <p></p>

        <input
                        type='text'
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
                        type='text'
                        name='visivel'
                        value={this.state.formulario.visivel ? 'Produto Visivel' : 'Produto não Visivel'}
                        onChange={this.formChange}
                    />

        <p></p>

            <input 
                        type="checkbox"   
                        name='promocao'
                        value='0'
                        onChange={this.formChange} />Produto em Promoção

                    <p></p>

           
        <p></p>



            <button class="btn btn-primary" type='button' onClick={this.updateOperador}>Editar</button>


</form>
        </div>
        )
    }
}

export default EditarOperador