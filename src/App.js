import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';



import Menu from './Components/Menu';
import Operador from './Components/Operador';
import Restaurante from './Components/Restaurante'

function App() {
  return (

    <BrowserRouter>
    <div className="App">,


    <Route path ='/' component = {Menu} />

    <Route path = '/Restaurante' component = {Restaurante}/>

    

    <Route path = '/Operador' component = {Operador} />


 



     </div>
     </BrowserRouter>

  );
}

export default App;
