import React from 'react';
import Select from 'react-select';
import Table from 'react-bootstrap/Table'
import MaskedInput from 'react-text-mask'
import {Link} from 'react-router-dom'


class ListaMenu extends React.Component {

    state = {
        listaMenu: [],
    }
    
    removerMenu = async (id_menu) => {
    
      try {
        let res = await fetch('path +/menu/remover', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token')
          },
          body: JSON.stringify({ "id_menu": id_menu })
        });
        alert('Removido com sucesso !');
        this.mostrarConteudo();
      } catch (error) {
        alert('ERRO AO REMOVER');
        console.log(error);
      }
    
    }
    
    
    mostrarConteudo = async function () {
        let res = await fetch('http://localhost:3001/menu/listar', {
            method: 'POST',
            headers: {
                'token': localStorage.getItem('token')
            },
        });
     
       
        this.setState({ listaMenu: await res.json() });
    
    }
    
    
    componentDidMount() {
        this.mostrarConteudo();
    
    }
    

    render() {
        return (
            <div>
                
           
<Link to = '/Menu/Cadastrar' >Cadastrar novo Menu</Link>
<p></p>
<Table striped bordered hover>
  <thead>
            <tr>
                <th>Nome do Prato</th>
                <th>Status do Menu</th>
                <th>Excluir</th>
                <th>Editar</th>
            </tr>

        </thead>

        <tbody>

        {

this.state.listaMenu.map((obj) =>{
  return (

    <tr>

         
          <td>{obj.ds_menu}</td>
          <td>{obj.ativo ? 'Menu Ativo':'Menu Desativado'}</td>

          <td><button  type='button' onClick={()=>this.removerMenu(obj.id_menu)}>Excluir </button></td>

          <td><Link to={{pathname:'/Menu/Editar', id_menu: obj.id_menu}}>Editar</Link></td>
   

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

export default ListaMenu;
