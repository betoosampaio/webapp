import React from 'react';
import Select from 'react-select';
import Table from 'react-bootstrap/Table'
import MaskedInput from 'react-text-mask'
import { Link } from 'react-router-dom'

class ListaOperador extends React.Component {

  state = {
    listaOperador: [],
}

removerOperador = async (id_operador) => {

  try {
    let res = await fetch('http://localhost:3001/operador/remover', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
      body: JSON.stringify({ "id_operador": id_operador })
    });
    alert('Removido com sucesso !');
    this.mostrarConteudo();
  } catch (error) {
    alert('ERRO AO REMOVER');
    console.log(error);
  }

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


render() {
    return (

        <div>



<Link to = '/Operador/Cadastrar' >Cadastrar novo Operador</Link>
<p></p>

<Table striped bordered hover>
<thead>
        <tr>
            
            <th>Nome Operador</th>
            <th>Perfil</th>
            <th>Login Operador</th>
            <th>Status</th>
            <th>Excluir</th>
            <th>Editar</th>
         
            
        </tr>
    </thead>
    <tbody>

    {

this.state.listaOperador.map((obj) =>{
  return (
    <tr>
    
      <td>{obj.nome_operador}</td>
      <td>{obj.tipo_perfil}</td>
      <td>{obj.login_operador}</td>
      <td>{obj.ativo  ? 'Operador Ativo' : 'Operador Desativado'}</td>
     

      <td><button  type='button' onClick={()=>this.removerOperador(obj.id_operador)}>Excluir </button></td>

      <td><Link to={{pathname:'/Operador/Editar', id_operador: obj.id_operador}}>Editar</Link></td>   

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


export default ListaOperador;