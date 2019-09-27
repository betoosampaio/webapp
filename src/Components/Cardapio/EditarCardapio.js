import React from 'react';
import Table from 'react-bootstrap/Table'


class EditarCardapio extends React.Component {

    state = { 
        listaCardapio: [],
        formulario: {
            nome_produto: '',
            descricao: '',
            preco: '',
            id_menu: '',
            visivel: '',
            promocao: '',
            imagem: '',
            id_restaurante:'',

    },
};

   

    updateOperador = async (event) => {
        console.log(this.state.formulario);

        let formulario = this.state.formulario;
      
        

        try {
            let res = await fetch('http://localhost:3001/operador/editar', {
                method: 'POST',
                headers: {
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify(this.state.formulario)
            });
            alert('CADASTRADO COM SUCESSO!');
        } catch (error) {
            alert('ERRO NO CADASTRO');
            console.log(error);
        }
        
    }
   

    selecionarOperador = async (event) => {
        console.log(this.state.formulario);

        
        try {
            let res = await fetch('http://localhost:3001/cardapio/listar', {
                method: 'POST',
                headers: {
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify(this.state.formulario)
            });
            this.setState({ listaCardapio: await res.json() });
           
        } catch (error) {
            
            console.log(error);
        }       
    }

    componentDidMount() {
        this.selecionarOperador();
 
    }


    formChange = (event) => {
        let formNewState = Object.assign({}, this.state.formulario);
        formNewState[event.target.name] = event.target.value;
        this.setState({ formulario: formNewState });
    }

    formChangeSelect = name => value => {
        let formNewState = Object.assign({}, this.state.formulario);
        formNewState[name] = value;
        this.setState({ formulario: formNewState });
    }
x

   
    render() {
        return (
           
       <div>

                <form>

                    <h3>Cardápio Cadastrado</h3>
                    <p></p>

    <tr>

        
             <input
                        type='text'
                        placeholder=''
                        name='id_restaurante'
                        value={this.state.formulario.id_restaurante}
                        onChange={this.formChange}
              />

             <input
                        type='text'
                        placeholder=''
                        name='descricao'  
                           
              />


            <input
                        type='text'
                        placeholder=''
                        name='preco'
                     
                    />




            <input
                        type='text'
                        placeholder=''
                        name='id_menu'
                   
                    />


 
            <input
                        type='text'
                        placeholder=''
                        name='visivel'
                    
                    />    

                         <input
                        type='text'
                        placeholder=''
                        name='promocao'
                    
                    />                    
                                       
                           
      <p></p>
                              
        </tr>
        
      


<button class="btn btn-primary" type='button' onClick={this.updateOperador}>Editar</button>
</form>
            </div>
        )
    }
}

export default EditarCardapio
