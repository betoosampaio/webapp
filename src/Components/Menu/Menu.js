import React from 'react'
import {Link} from 'react-router-dom'
const Menu = props =>{
return(

    <nav id="menu">
    <ul>
    <li> <Link to = '/' >Inicio</Link></li>
    <li> <Link to = '/Restaurante/cadRestaurante' >Cadastro Restaurante</Link></li>
    <li> <Link to = '/Operador/cadOperador' >Cadastro Operador</Link></li>
    <li> <Link to = '/Cardapio/cadCardapio' >Cadastro Cardápio</Link></li>
    </ul>
    </nav>

)

}
export default Menu