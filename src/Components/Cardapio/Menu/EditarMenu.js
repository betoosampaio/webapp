
import React from 'react';
import Select from 'react-select';
import Table from 'react-bootstrap/Table'
import MaskedInput from 'react-text-mask'
import {Link} from 'react-router-dom'


const path = process.env.REACT_APP_SRV_PATH;
const pathWeb = process.env.REACT_APP_WEB_PATH;

class EditarMenu extends React.Component {

    constructor(props) {
        super(props);
                  
        this.state = { 
           
            formulario: {
                id_menu:this.props.location.id_menu,
                ds_menu:'',
                ativo:'',               
        },
    }
}


updateMenu = async (event) => {
     
    let formulario = this.state.formulario;
   
    
         try {
        let res = await fetch(path + '/menu/editar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify(this.state.formulario)
        });
        alert('MENU EDITADO COM SUCESSO!');
        window.location.href = pathWeb + '/menu/lista';
    } catch (error) {
        alert('ERRO AO EDITAR O MENU');
        console.log(error);
    }
    
}



selecionarMenu = async (event) => {
       
    try {
        let res = await fetch(path + '/menu/obter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify({"id_menu":  this.props.location.id_menu})
        });
       let data = await res.json();
               
       let obj = data[0];
        this.setState({ formulario: obj});
       
       
    } catch (error) {
        
        console.log(error);
    }       
}

componentDidMount() {
    this.selecionarMenu();
}



formChange = (event) => {
    let formNewState = Object.assign({}, this.state.formulario);
    formNewState[event.target.name] = event.target.value;
    this.setState({ formulario: formNewState });
}

formChangeCheck = (event) => {
    let formNewState = Object.assign({}, this.state.formulario);
    formNewState[event.target.name] = event.target.checked ? 1:0;
    this.setState({ formulario: formNewState });
}   



    render() {
        return (
            <div>

<form>
                    <h1>Editar o Menu</h1>

                    <p></p>


                <input
                type='text'
                name='ds_menu'
                value={this.state.formulario.ds_menu}
                onChange={this.formChange}
                />
                <p></p>


                <input 
                        type="checkbox"   
                        name='ativo'
                        checked = {this.state.formulario.ativo}
                        onChange={this.formChangeCheck} />Menu Ativo

                    <p></p>

          

 <button class="btn btn-primary" type='button' onClick={this.updateMenu}>Editar</button>
 <p></p>

 <a href="/Menu/Lista">Voltar</a>

</form>

            </div>
        )
    }
}

export default EditarMenu;
