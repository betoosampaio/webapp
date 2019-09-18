import React from 'react';
import Select from 'react-select';

import MaskedInput from 'react-text-mask'

class showOperador extends React.Component {

    state = {
        listaOperador: [],
    }

    mostrarConteudo = async function () {
        let res = await fetch('http://localhost:3001/operador/selectall', {
            method: 'POST',
        });
        this.setState({ listaOperador: await res.json() });
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
                <td>cnpj</td>                
                <td>Nome Fantasia</td>               
              

            </tr>
        </thead>
        <tbody>

        {

    this.state.listaOperador.map(function(obj){
      return (
        <tr>
          <td>{obj.login}</td>
          <td>{obj.perfil}</td>
     
        
          <td><a href="">Editar</a> - <a href="">Deletar</a></td>
        </tr>
      );
    })
  }

        </tbody>
        <button><a href="/">Voltar</a></button>

</table>
            </div>
        )
    }
}


export default showOperador;
