import React from 'react';
import Select from 'react-select';

import MaskedInput from 'react-text-mask'

class showOperador extends React.Component {

    state = {
listaResutanrate: []
    }

    mostrarConteudo = async function () {
        let res = await fetch('http://localhost:3001/restaurante/selectall', {
            method: 'POST',
        });
        this.setState({ listaResutanrate: await res.json() });
    }

    
    componentDidMount() {
        this.mostrarConteudo();
       
    }

    render() {
        return (
            <div>


                                    <h2>DADOS DO OPERADOR</h2>

<p>{this.state.listaResutanrate}</p>



            </div>
        )
    }
}


export default showOperador;
