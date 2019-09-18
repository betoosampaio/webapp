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

<p>{JSON.stringify(this.state.listaRestaurante)}</p>


<tbody>
  { 
    this.state.listaRestaurante.map(function(obj){
      return (
        <tr>
          <td>{obj.cnpj}</td>
          <td>{obj.email}</td>
        </tr>
      );
    })
  }
</tbody>


         <table border="1">
        <thead>
            <tr>
                <td>cnpj</td>
                <td>Nome Fantasia</td>
                <td>Cep</td>
                <td>Logradouro</td>
                <td>Número</td>
                <td>Bairro</td>
                <td>Municipio</td>
                <td>UF</td>
                <td>Complemento</td>
                <td>Celular</td>
                <td>email</td>
                <td>Banco</td>
                <td>Tipo da Conta</td>
                <td>Tipo CONTA</td>
                <td>Agência</td>
                <td>Conta</td>
                <td>Digito</td>
                <td>Cpf Administrador</td>
                <td>Login</td>
                <td>Senha</td>

            </tr>
        </thead>
        <tbody>

            <tr>
                <td>teste</td>
                <td>teste</td>
                <td>teste</td>
                <td>teste</td>
                <td>teste</td>
                <td>teste</td>
                <td>teste</td>
                <td>teste</td>
                <td>teste</td>
                <td>teste</td>
                <td>teste</td>
                <td>teste</td>
                <td>teste</td>
                <td>teste</td>
                <td>teste</td>
                <td>teste</td>
                <td>teste</td>
                <td>teste</td>
                <td>teste</td>
                <td>teste</td>



            </tr>
        </tbody>
        <button><a href="/">Voltar</a></button>

</table>
            </div>
        )
    }
}


export default showRestaurante;
