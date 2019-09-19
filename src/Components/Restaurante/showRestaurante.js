import React from 'react';
import Select from 'react-select';
import Table from 'react-bootstrap/Table'
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

<Table striped bordered hover>
  <thead>
    <tr>
      <th>ID REstaurante</th>
      <th>cnpj</th>
      <th>nome_Fantasia</th>
      <th>cep</th>
      <th>logradouro</th>
      <th>numero</th>
      <th>bairro</th>
      <th>municipio</th>
      <th>uf</th>
      <th>complemento</th>
      <th>celular</th>
      <th>email</th>
      <th>codigo_banco</th>
      <th>id_tipo_cadastro_conta</th>
      <th>id_tipo_conta</th>
      <th>agencia</th>
      <th>conta</th>
      <th>digito</th>
      <th>cpf_administrador</th>
      <th>nome_administrador</th>
      <th>login</th>
      <th>senha</th>

      
    </tr>
  </thead>
  <tbody>
  {

this.state.listaRestaurante.map(function(obj){
  return (
    <tr>
      <td>{obj.id_restaurante}</td>
      <td>{obj.cnpj}</td>
      <td>{obj.nome_fantasia}</td>
      <td>{obj.cep}</td>
      <td>{obj.logradouro}</td>
      <td>{obj.numero}</td>
      <td>{obj.bairro}</td>
      <td>{obj.municipio}</td>
      <td>{obj.uf}</td>
      <td>{obj.complemento}</td>
      <td>{obj.celular}</td>
      <td>{obj.email}</td>
      <td>{obj.codigo_banco}</td>
      <td>{obj.id_tipo_cadastro_conta}</td>
      <td>{obj.id_tipo_conta}</td>
      <td>{obj.agencia}</td>
      <td>{obj.cona}</td>
      <td>{obj.digito}</td>
      <td>{obj.cpf_administrador}</td>
      <td>{obj.nome_administrador}</td>
      <td>{obj.login}</td>
      <td>{obj.senha}</td>
    
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


export default showRestaurante;
