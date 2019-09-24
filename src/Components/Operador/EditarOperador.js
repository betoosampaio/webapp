import React from 'react';
import Table from 'react-bootstrap/Table'


class EditarOperador extends React.Component {


    state = {
        listaOperador: [],
        formulario: {
            id_restaurante: '',
            nome_Operador:'',
       
      
        },
    };

   

    updateOperador = async (event) => {
        console.log(this.state.formulario);

        let formulario = this.state.formulario;
        // ajustando os valores dos Select
        formulario.id_restaurante = formulario.id_restaurante.id_restaurante;
     

        try {
            let res = await fetch('http://localhost:3001/operador/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
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
            let res = await fetch('http://localhost:3001/operador/selectwhere', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.formulario)
            });
            this.setState({ listaOperador: await res.json() });
           
        } catch (error) {
            
            console.log(error);
        }
        
        
    }

    formChange = (event) => {
        let formNewState = Object.assign({}, this.state.formulario);
        formNewState[event.target.name] = event.target.value;
        this.setState({ formulario: formNewState });
    }

    formChangeSelect = name => value => {
        console.log(name);
        console.log(value[name]);
        let formNewState = Object.assign({}, this.state.formulario);
        formNewState[name] = value[name];
        this.setState({ formulario: formNewState });
    }

   
    render() {
        return (
           
       <div>

<form>

    <h4>Digite o número do Restaurante</h4>
<input
                        type='text'
                        placeholder='ID Restaurante'
                        name='id_restaurante'
                        value={this.state.formulario.id_restaurante}
                        onChange={this.formChange}
                      
                    />


<button class="btn btn-primary" type='button' onClick={this.selecionarOperador}>Submit</button>

</form>
                <form>



{
this.state.listaOperador.map(function(obj){
  return (
    <tr>



 


             <input
                        type='text'
                        placeholder={"Id Restaurante " + obj.id_restaurante}
                        name='id_restaurante'
                        
              />

             <input
                        type='text'
                        placeholder={"Nome do Operador " + obj.nome_Operador}
                        name='nome_Operador'
                        
                   
                    />


            <input
                        type='text'
                        placeholder={"Perfil do Operador " + obj.perfil}
                        name='perfil'
                     
                    />




            <input
                        type='text'
                        placeholder={"Login do Operador " +obj.login_Operador}
                        name='login_Operador'
                   
                    />


 
            <input
                        type='text'
                        placeholder={"Senha do Operador " + obj.senha_Operador}
                        name='senha_Operador'
                    
                    />                       
                                       
                           
      <p></p>
                              
        </tr>
        
      );
    })  
}

<button class="btn btn-primary" type='button' onClick={this.updateOperador}>Submit</button>
</form>
            </div>
        )
    }
}

export default EditarOperador
