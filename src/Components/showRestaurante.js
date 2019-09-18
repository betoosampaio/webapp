import React from 'react';
import Select from 'react-select';

import MaskedInput from 'react-text-mask'

class showRestaurante extends React.Component {

    state = {
listaRestaurante: [],
    }

    mostrarConteudo = async function () {
        let res = await fetch('http://localhost:3001/restaurante/selectall', {
            method: 'POST',
        });
        this.setState({ listaRestaurante: await res.json() });
    }
    
    componentDidMount() {
        this.mostrarConteudo();
       
    }

    render() {
        return (
            <div>

        <table border="1">
        <thead>
            <tr>
                <td>Nome</td>
                <td>Sobrenome</td>
            </tr>
        </thead>
        <tbody>
            {/* 
        <% data.forEach(function(details) { %>
            <tr>
                <td><%= details.name %></td>
                <td></td>
            </tr>
            <% }) %>
        */}
        </tbody>
        <button><a href="/">Voltar</a></button>

</table>
            </div>
        )
    }
}


export default showRestaurante;
