import React from 'react';
import Select from 'react-select';
import Table from 'react-bootstrap/Table'
import MaskedInput from 'react-text-mask'
import {Link} from 'react-router-dom'
const path = process.env.REACT_APP_SRV_PATH;


class listaProduto extends React.Component {

 
    state = {
        listaProduto: [],
    }
    
    removerProduto = async (id_produto) => {
    
      try {
        let res = await fetch('path +/produto/remover', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token')
          },
          body: JSON.stringify({ "id_produto": id_produto })
        });
        alert('Removido com sucesso !');
        this.mostrarConteudo();
      } catch (error) {
        alert('ERRO AO REMOVER');
        console.log(error);
      }
    
    }
    
    
    mostrarConteudo = async function () {
        let res = await fetch('path +/produto/listar', {
            method: 'POST',
            headers: {
                'token': localStorage.getItem('token')
            },
        });
     
       
        this.setState({ listaProduto: await res.json() });
    
    }
    
    
    componentDidMount() {
        this.mostrarConteudo();
    
    }
    


    render() {
        return (

            <div>


<Link to = '/Cardapio/Cadastrar' >Cadastrar novo Cardápio</Link>
<p></p>
<Link to = '/Menu/Lista' >Lista de Menu</Link>
<p></p>
<Table striped bordered hover>
  <thead>
            <tr>
                <th>Nome do Prato</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Menu</th>
                <th>Status</th>
                <th>promoção</th>
                <th>Excluir</th>
                <th>Editar</th>
            </tr>

        </thead>

        <tbody>

        {

this.state.listaProduto.map((obj) =>{
  return (

    <tr>

         
          <td>{obj.nome_produto}</td>
          <td>{obj.descricao}</td>
          <td>{obj.preco.toString().replace('.',',')}</td>
          <td>{obj.ds_menu}</td>
          <td>{obj.visivel ? 'Ativo' : 'Desativado'}</td>
          <td>{obj.promocao ? 'sim' : 'não'}</td>

          <td><button  type='button' onClick={()=>this.removerProduto(obj.id_produto)}>Excluir </button></td>

          <td><Link to={{pathname:'/Cardapio/Editar', id_produto: obj.id_produto}}>Editar</Link></td>
   

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


export default listaProduto;
