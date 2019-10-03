import React from 'react';
import Select from 'react-select';

import MaskedInput from 'react-text-mask'

class Menu extends React.Component {

    state = {
      
        formulario: {
            ds_menu: '',
            id_restaurante:'',
      
        },
    };



    cadastrarMenu = async (event) => {
        console.log(this.state.formulario);

        let formulario = this.state.formulario;
        // ajustando os valores dos Select
      
            
        try {
            let res = await fetch('http://localhost:3001/menu/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify(this.state.formulario)
            });
            alert('MENU CADASTRADO COM SUCESSO!');
            window.location.href = "http://localhost:3000/Menu/Lista"
        } catch (error) {
            alert('ERRO AO CADASTRAR O MENU');
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

<h2>Registrar Menu</h2>


<input
type='text'
placeholder='Nome do Menu'
name='ds_menu'
value={this.state.formulario.ds_menu}
onChange={this.formChange}

/>


<p></p>


<button class="btn btn-primary" type='button' onClick={this.cadastrarMenu}>Cadastrar Menu</button>
<p></p>
<a href="/Menu/Lista">Voltar</a>

<p></p>



</form> 
                                    
            </div>
        )
    }
}

export default Menu;
