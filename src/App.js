import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';



import Menu from './Components/Menu/Menu';
import Operador from './Components/Operador/cadOperador';
import Restaurante from './Components/Restaurante/cadRestaurante'
import Cardapio from './Components/Cardapio/cadCardapio'
import showOperador from './Components/Operador/showOperador'
import showRestaurante from './Components/Restaurante/showRestaurante'
import showCardapio from './Components/Cardapio/showCardapio'

function App() {
  return (

    <BrowserRouter>
    <div className="App">,


    <Route path ='/' component = {Menu} />

    <Route path = '/Restaurante/cadRestaurante' component = {Restaurante}/>    

    <Route path = '/Operador/cadOperador' component = {Operador} />

    <Route path = '/Cardapio/cadCardapio' component = {Cardapio} />

    <Route path = '/Cardapio/showCardapio' component = {showCardapio} />

    <Route path = '/Restaurante/showRestaurante' component = {showRestaurante} />

    <Route path = '/Operador/showOperador' component = {showOperador} />


 



     </div>
     </BrowserRouter>

  );
}

export default App;
