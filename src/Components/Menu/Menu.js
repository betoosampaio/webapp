import React from 'react'
import {Link} from 'react-router-dom'
const Menu = props =>{
return(

    <nav id="menu">
    <ul>
    
    <li> <Link to = '/App/Gerenciar' >Gerenciamento do Restaurante</Link></li>
    <li> <Link to = '/App/Operador/Cadastrar' >Operadores</Link></li>
    <li> <Link to = '/App/Cardapio/Cadastrar' >Cardapios</Link></li>
    <li style={{float: 'right'}}> <Link to = '/Login' >Login</Link></li>
    <li style={{float: 'right'}}> <Link to = '/CadastroRestaurante' >CadastroRestaurante</Link></li>
    </ul>
    </nav>

)

}
export default Menu