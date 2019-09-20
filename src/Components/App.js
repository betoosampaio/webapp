import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import Login from './Login/Login';
import CadastrarRestaurante from './Restaurante/CadastrarRestaurante';

import Menu from './Menu/Menu';

import GerenciamentoRestaurante from './GerenciamentoRestaurante/GerenciamentoRestaurante';

import ListaOperador from './Operador/ListaOperador';
import CadastrarOperador from './Operador/CadastrarOperador';

import ListaCardapio from './Cardapio/ListaCardapio';
import CadastrarCardapio from './Cardapio/CadastrarCardapio';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Redirect from="/" to="/App/GerenciamentoRestaurante"/>

        <Route path='/Login' component={Login} />
        <Route path='/CadastroRestaurante' component={CadastrarRestaurante} />

        <Route path='/App' component={Menu} />

        <Route path='/App/Gerenciar' component={GerenciamentoRestaurante} />

        <Route path='/App/Operador/Lista' component={ListaOperador} />
        <Route path='/App/Operador/Cadastrar' component={CadastrarOperador} />

        <Route path='/App/Cardapio/Lista' component={ListaCardapio} />
        <Route path='/App/Cardapio/Cadastrar' component={CadastrarCardapio} />

      </div>
    </BrowserRouter>
  );
}

export default App;
