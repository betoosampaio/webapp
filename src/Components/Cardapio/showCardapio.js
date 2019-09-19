import React from 'react';
import Select from 'react-select';
import Table from 'react-bootstrap/Table'
import MaskedInput from 'react-text-mask'

class showCardapio extends React.Component {

    state = {
        listaCardapio: [],
    }

    mostrarConteudo = async function () {
        let res = await fetch('http://localhost:3001/cardapio/selectall', {
            method: 'POST',
        });
        this.setState({ listaCardapio: await res.json() });
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
                <th>Nome do Prato</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Menu</th>
                <th>Visivel</th>
                <th>promoção</th>
                <th>Foto</th>



            </tr>
        </thead>
        <tbody>

        {

    this.state.listaCardapio.map(function(obj){
      return (
        <tr>
          <td>{obj.nome_Produto}</td>
          <td>{obj.descricao}</td>
          <td>{obj.preco}</td>
          <td>{obj.menu}</td>
          <td>{obj.visivel}</td>
          <td>{obj.promocao}</td>

 
          

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
