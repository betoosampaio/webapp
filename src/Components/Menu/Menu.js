import React from 'react'
import {Link} from 'react-router-dom'
const Menu = props =>{
return(

    <nav id="menu">
    <ul>
    
    <li> <Link to = '/App/Gerenciamento' >Gerenciamento do Restaurante</Link></li>
    <li> <Link to = '/App/Operador/Lista' >Operadores</Link></li>
    <li> <Link to = '/App/Cardapio/Lista' >Cardapios</Link></li>
    <li style={{float: 'right'}}> <Link to = '/Login' >Login</Link></li>
    <li style={{float: 'right'}}> <Link to = '/CadastroRestaurante' >CadastroRestaurante</Link></li>
    </ul>
    </nav>

)

}
export default Menu