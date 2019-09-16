import React from 'react'
import {Link} from 'react-router-dom'
const Menu = props =>{
return(

    <nav id="menu">
    <ul>
    <li> <Link to = '/' >Inicio</Link></li>
    <li> <Link to = '/Restaurante' >Cadastro Restaurante</Link></li>
    <li> <Link to = '/Operador' >Cadastro Operador</Link></li>
    <li> <Link to = '/Cardapio' >Cadastro Cardápio</Link></li>
    </ul>
    </nav>

)

}
export default Menu