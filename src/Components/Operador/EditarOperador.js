import React from 'react';
import Table from 'react-bootstrap/Table'


class EditarOperador extends React.Component {

    constructor(props) {
        super(props);
        
          
        this.state = { 
            Operador: [],
            formulario: {
            nome_operador: '',
            id_perfil: '',
            login_operador: '',
            senha_operador: '',
         
        },
    }
}

 


   

    updateOperador = async (event) => {
     

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
       
        try {
            let res = await fetch('http://localhost:3001/operador/obter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify({"id_operador":  this.props.location.id_operador})
            });
           let data = await res.json();
          
           this.setState({ Operador: data[0]});
           
           
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


   
    render() {
        return (
           
       <div>
{/*
    
    <form>

                    <h3>Operadores Cadastrado</h3>
                    <p></p>


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
                        placeholder={obj.id_operador}
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

<button class="btn btn-primary" type='button' onClick={this.updateOperador}>Editar</button>
</form>
*/}
            </div>
        )
    }
}

export default EditarOperador
