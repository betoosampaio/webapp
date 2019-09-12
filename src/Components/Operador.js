import React from 'react'
import {Link} from 'react-router-dom'
const Operador = props =>{
return(

    <form action='http://localhost:3000/operador/insert' method='POST'>

    <h2>Registrar Operador</h2>

        <input type='text' placeholder='Nome' name='nome_Operador' />

        <p></p>

        
    <select name="perfil">

     <label for="text">Tipo de Conta:</label>

     <option value="0"  selected> Gerente </option>

     <option value="1"  > Garçom </option>

     </select>



        <p></p>

        <input type='text' placeholder='Login' name='login_Operador' />

        <p></p>

        <input type='text' placeholder='Senha' name='senha_Operador' />

        <p></p>

        


        <button type='submit'>Submit</button>

        <Link to = '/Operadores' > Operadores Cadastrados</Link>

    </form>


)

}
export default Operador