import React from 'react';
import Select from 'react-select';
import Table from 'react-bootstrap/Table'
import MaskedInput from 'react-text-mask'
import { Link } from 'react-router-dom'
import Autosuggest from 'react-autosuggest';
const path = process.env.REACT_APP_SRV_PATH;



class EditarRestaurante extends React.Component {

    constructor(props) {
        super(props);
                  
        this.state = { 
            estados: [],
            formulario: {
                cnpj: '',
                         
        },
    }
}



selecionarRestaurante = async (event) => {
       
    try {
        let res = await fetch('http://localhost:3001/restaurante/obter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify({"id_restaurante":  this.props.location.id_restaurante})
        });
       let data = await res.json();
               
       let obj = data[0];
       this.setState({ formulario: obj});
       
       
    } catch (error) {
        
        console.log(error);
    }       
}



componentDidMount() {
    this.selecionarRestaurante();
}






render() {
    return (

        
        <div>
                <form>
                    <h2>Registrar Restaurante</h2>

                    <tr>{this.state.formulario.cnpj}</tr>
                    
                    <p></p>

                    <tr>{this.state.formulario.nome_fantasia}</tr>
                    
                  

                </form>
            </div>


    )
}
}


export default EditarRestaurante;