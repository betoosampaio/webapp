import React from 'react';
import Select from 'react-select';
import Table from 'react-bootstrap/Table'
import MaskedInput from 'react-text-mask'
import {Link} from 'react-router-dom'

class ListaOperador extends React.Component {

    state = {
        listaOperador: [],
    }

    mostrarConteudo = async function () {
        let res = await fetch('http://localhost:3001/operador/listar', {
            method: 'POST',
            headers: {
                'token': localStorage.getItem('token')
            },
        });
     
       
        this.setState({ listaOperador: await res.json() });
   
    }

    

    componentDidMount() {
        this.mostrarConteudo();

    }



    editarOperador = async (event) => {
        console.log(this.state.formulario);
    
        let res = await fetch('http://localhost:3001/operador/obter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.formulario)
        });
        let sucess = await res.ok;
    
        if (sucess) {
          alert('LOGADO COM SUCESSO!');
          let id_operador = await res.json();
          localStorage.setItem('idOperador', id_operador);
          
    
        } else {
          let err = await res.json();
          alert('ERRO AO LOGAR: ' + err.msg);
        }
    
      }


     


    render() {
        return (

            <div>



<Link to = '/Operador/Cadastrar' >Cadastrar novo Operador</Link>
<p></p>
<Link to = '/Operador/Editar' >Editar Operador</Link>
<p></p>
<Table striped bordered hover>
  <thead>
            <tr>
                <th>ID Restaurante</th>
                <th>Id Operador</th>
                <th>Nome Operador</th>
                <th>Perfil</th>
                <th>Login Operador</th>
                <th>Senha</th>
                
                
            </tr>
        </thead>
        <tbody>

     
    
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>{this.state.tipo_perfil}</td>
          <td>{this.state.listaOperador.map.login_operador}</td>
          <td></td>
          <td><button onClick={(id_operador)=>this.removerOperador()} className="myListButton">remove </button></td>
        </tr>


</tbody>

</Table>

            </div>
        )
    }
}


export default ListaOperador;
