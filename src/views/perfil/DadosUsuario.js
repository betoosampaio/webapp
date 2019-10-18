import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import serverRequest from '../../utils/serverRequest';

const path = process.env.REACT_APP_SRV_PATH;
class ListaPerfil extends Component {
    state = {
        ListaRestaurante: [],
    }

    mostrarConteudo = async function () {
        let res = await fetch(path + '/restaurante/obter', {
            method: 'POST',
            headers: {
                'token': localStorage.getItem('token')
            },
        });
     
       
        this.setState({ ListaRestaurante: await res.json() });
    
    }
    
    
    componentDidMount() {
        this.mostrarConteudo();
    
    }


   

    render() {
        return (
        
<Table striped bordered hover>
<thead>
        <tr>

        
            <th>Cnpj</th>
            <th>Nome Fantasia</th>
            <th>Endereço</th>
            <th>Celular</th>
            <th>E-mail</th>
            <th>Nome Administrador</th>
            <th>Editar</th>
                                 
        </tr>
    </thead>
    <tbody>

    {

this.state.ListaRestaurante.map((obj) =>{
  return (
    <tr>
    

     
      <td>{obj.cnpj}</td>
      <td>{obj.nome_fantasia}</td>
      <td>{obj.logradouro} - {obj.numero} - {obj.complemento}</td>
      <td>{obj.celular}</td>
      <td>{obj.email}</td>
      <td>{obj.nome_administrador}</td>
      <td><Link to={{pathname:'/Restaurante/Editar', id_restaurante: obj.id_restaurante}}>Editar</Link></td>
      
     

    </tr>
  );
})
}
</tbody>
</Table>
        );
    }
}

export default ListaPerfil;
