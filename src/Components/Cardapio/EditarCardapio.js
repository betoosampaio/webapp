import React from 'react';
import Table from 'react-bootstrap/Table'


class EditarCardapio extends React.Component {

    state = { 
        listaOperador: [],
        formulario: {
        nome_operador: '',
        id_perfil: '',
        login_operador: '',
        senha_operador: '',

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
            let res = await fetch('http://localhost:3001/operador/listar', {
                method: 'POST',
                headers: {
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify(this.state.formulario)
            });
            this.setState({ listaOperador: await res.json() });
           
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

                    <h3>Operadores Cadastrado</h3>
                    <p></p>

{
    
this.state.listaOperador.map(function(obj){
    
    
  return (
    <tr>

        
             <input
                        type='text'
                        placeholder={obj.id_restaurante}
                        name='id_restaurante'
                        
              />

             <input
                        type='text'
                        placeholder={obj.nome_operador}
                        name='nome_operador'  
                           
              />


            <input
                        type='text'
                        placeholder={obj.id_perfil}
                        name='id_perfil'
                     
                    />




            <input
                        type='text'
                        placeholder={obj.login_operador}
                        name='login_operador'
                   
                    />


 
            <input
                        type='text'
                        placeholder={obj.senha_operador}
                        name='senha_operador'
                    
                    />                       
                                       
                           
      <p></p>
                              
        </tr>
        
      );
    })  
}

<button class="btn btn-primary" type='button' onClick={this.updateOperador}>Editar</button>
</form>
            </div>
        )
    }
}

export default EditarCardapio
