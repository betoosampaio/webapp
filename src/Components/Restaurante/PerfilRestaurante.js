import React from 'react';
import Select from 'react-select';
import Table from 'react-bootstrap/Table'
import MaskedInput from 'react-text-mask'
import { Link } from 'react-router-dom'
const path = process.env.REACT_APP_SRV_PATH;

class PerfilRestaurante extends React.Component {

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

        <div>

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


        </div>
    )
}
}


export default PerfilRestaurante;