import React from 'react';
import Select from 'react-select';
import Table from 'react-bootstrap/Table'
import MaskedInput from 'react-text-mask'
import {Link} from 'react-router-dom'

class showCardapio extends React.Component {

 
    state = {
        listaCardapio: [],
    }

    mostrarConteudo = async function () {
     
        let res = await fetch('http://localhost:3001/cardapio/listar', {
            method: 'POST',
            headers: {
                'token': localStorage.getItem('token')
            },
        });
       
       
        this.setState({ listaCardapio: await res.json() });
   
    }

    

    componentDidMount() {
        this.mostrarConteudo();

    }





    render() {
        return (

            <div>


<Link to = '/Cardapio/Cadastrar' >Cadastrar novo Cardápio</Link>
<p></p>
<Link to = '/Cardapio/Editar' >Editar Operador</Link>
<p></p>
<Link to = '/Cardapio/Menu' >Cadastrar Menu</Link>
<p></p>
<Table striped bordered hover>
  <thead>
            <tr>
                <th>Id Restaurante</th>
                <th>Nome do Prato</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Menu</th>
                <th>Visivel</th>
                <th>promoção</th>
               



            </tr>
        </thead>
        <tbody>

        {

this.state.listaOperador.map(function(obj){
  return (
    <tr>
      <td>{obj.id_restaurante}</td>
      <td>{obj.id_operador}</td>
      <td>{obj.nome_operador}</td>
      <td>{obj.id_perfil}</td>
      <td>{obj.login_operador}</td>
      <td>{obj.senha_operador}</td>


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


export default showCardapio;
