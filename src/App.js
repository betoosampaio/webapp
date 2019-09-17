import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';



import Menu from './Components/Menu';
import Operador from './Components/Operador';
import Restaurante from './Components/Restaurante'
import Cardapio from './Components/Cardapio'
import showOperador from './Components/showOperador'
import showRestaurante from './Components/showRestaurante'
import showCardapio from './Components/showCardapio'

function App() {
  return (

    <BrowserRouter>
    <div className="App">,


    <Route path ='/' component = {Menu} />

    <Route path = '/Restaurante' component = {Restaurante}/>    

    <Route path = '/Operador' component = {Operador} />

    <Route path = '/Cardapio' component = {Cardapio} />

    <Route path = '/showCardapio' component = {showCardapio} />

    <Route path = '/showRestaurante' component = {showRestaurante} />

    <Route path = '/showOperador' component = {showOperador} />


 



     </div>
     </BrowserRouter>

  );
}

export default App;
