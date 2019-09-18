import React from 'react';
import Select from 'react-select';
import Table from 'react-bootstrap/Table'
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


        
<Table striped bordered hover>
  <thead>
            <tr>
                <th>Id Operador</th>
                <th>Nome Operador</th>
                <th>Perfil</th>
                <th>Login Operador</th>
                <th>Senha</th>



            </tr>
        </thead>
        <tbody>

        {

    this.state.listaOperador.map(function(obj){
      return (
        <tr>
          <td>{obj.Id_Operador}</td>
          <td>{obj.nome_Operador}</td>
          <td>{obj.perfil}</td>
          <td>{obj.login_Operador}</td>
          <td>{obj.senha_Operador}</td>


          <td><a href="">Editar</a> - <a href="">Deletar</a></td>
        </tr>
      );
    })
}
</tbody>
</Table>

            </div>
        )
    }
}


export default showOperador;
