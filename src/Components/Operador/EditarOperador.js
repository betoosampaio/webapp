import React from 'react';
import Table from 'react-bootstrap/Table'
import Select from 'react-select';


class EditarOperador extends React.Component {

    constructor(props) {
        super(props);
                  
        this.state = { 
            perfil: [],
            formulario: {
            nome_operador: '',
            id_perfil: '',
            login_operador: '',
            senha_operador: '',
            ativo: '' ,
            id_operador:this.props.location.id_operador,
        },
    }
}


    updateOperador = async (event) => {
     
        let formulario = this.state.formulario;
        formulario.id_perfil = formulario.id_perfil.id_perfil;
        
             try {
            let res = await fetch('path +/operador/editar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify(this.state.formulario)
            });
            alert('OPERADOR EDITADO COM SUCESSO!');
            window.location.href = "pathWeb +/operador/lista"
        } catch (error) {
            alert('ERRO AO EDITAR');
            console.log(error);
        }
        
    }
  

    obterPerfil = async function () {
        let res = await fetch('path +/perfil/listar', {
            method: 'POST',
            headers: {
                'token': localStorage.getItem('token')
            },
        });
        this.setState({ id_perfil: await res.json() });
    }
    


    selecionarOperador = async (event) => {
       
        try {
            let res = await fetch('path +/operador/obter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify({"id_operador":  this.props.location.id_operador})
            });
           let data = await res.json();
                   
           let obj = data[0];
           obj.id_perfil = {id_perfil: obj.id_perfil , tipo_perfil: obj.tipo_perfil}
           this.setState({ formulario: obj});
           
           
        } catch (error) {
            
            console.log(error);
        }       
    }

    componentDidMount() {
        this.selecionarOperador();
        this.obterPerfil();
 
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

  
    formChangeCheck = (event) => {
        let formNewState = Object.assign({}, this.state.formulario);
        formNewState[event.target.name] = event.target.checked ? 1:0;
        this.setState({ formulario: formNewState });
    }




   
    render() {
        return (
           
       <div>

    <form>
                    <h3>Editar Operadores</h3>

                    <p></p>
                       <label>NomeOperador</label>
                       <p></p>

            <input
              type='text'
              name='nome_operador'
              value={this.state.formulario.nome_operador}
              onChange={this.formChange}
            />

                        <p></p>
                       <label>TipoPerfil</label>
                       <p></p>

            <Select
                        name="id_perfil"
                        options={this.state.id_perfil}
                        getOptionLabel={option => option.tipo_perfil}
                        getOptionValue={option => option.id_perfil}
                        value={this.state.formulario.id_perfil}
                        onChange={this.formChangeSelect('id_perfil')}
            />

                        <p></p>
                       <label>LoginOperador</label>
                       <p></p>

            <input
                        type='text'
                        name='login_operador'
                        value={this.state.formulario.login_operador}
                        onChange={this.formChange}
            />

                <p></p>

            <input 
                        type="checkbox"   
                        name='ativo'
                        checked = {this.state.formulario.ativo}
                        onChange={this.formChangeCheck} /> Ativo

                        <p></p>
                       <label>SenhaOperador</label>
                       <p></p>

            <input
                        type='password'
                        name='senha_operador'
                        value={this.state.formulario.senha_operador}
                        onChange={this.formChange}
            />
        <p></p>



            <button class="btn btn-primary" type='button' onClick={this.updateOperador}>Editar</button>
<p></p>
            <a href="/Operador/Lista">Voltar</a>

</form>
        </div>
        )
    }
}

export default EditarOperador