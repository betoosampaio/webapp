import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from './auth';


import GerenciamentoRestaurante from '../Gerenciamento/GerenciamentoRestaurante';
import Login from '../Login/Login';


import ListaOperador from '../Operador/ListaOperador';
import CadastrarOperador from '../Operador/CadastrarOperador';


import ListaCardapio from '../Cardapio/ListaCardapio';
import EditarCardapio from '../Cardapio/EditarCardapio';
import CadastrarCardapio from '../Cardapio/CadastrarCardapio';


import ListaMenu from '../Cardapio/Menu/ListaMenu';
import EditarMenu from '../Cardapio/Menu/EditarMenu';


import ListaRestaurante from '../Restaurante/PerfilRestaurante';
import EditarRestaurante from '../Restaurante/EditarRestaurante';





const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route{...rest} render={props => (
    isAuthenticated() ? (<Component {...props} />) : window.location.href = "http://localhost:3000/Login")} />
)

const logout = async (event) => {

  let res = await fetch({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

  });
  let sucess = await res.ok;
  alert('Você foi deslogado com sucesso !')
  localStorage.removeItem('token');
  window.location.href = "http://localhost:3000/Login"
}




function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav id="menu">
          <ul>
            <li> <Link to='/Gerenciamento'>Gerenciamento</Link></li>
            <li> <Link to='/Operador/Lista'>Operadores</Link></li>
            <li> <Link to='/Cardapio/Lista'>Cardapios</Link></li>
            <li style={{ float: 'right' }}> <a href='/Login' onClick={logout}>Sair</a></li>
            <li style={{ float: 'right' }}> <a href='/Login'>Entrar</a></li>
            <li style={{ float: 'right' }}> <a href='/SignIn'>Cadastrar-se</a></li>
            <li style={{ float: 'right' }}> <a href='/web/home'>Home</a></li>
            <li style={{ float: 'right' }}> <a href='restaurante/Perfil'>Perfil</a></li>
          </ul>
        </nav>

        <div className="content">

          <Switch>

            <Route exact path='/Login' component={Login} />



            <PrivateRoute path='/Gerenciamento' component={GerenciamentoRestaurante} />


            <PrivateRoute path='/Restaurante/Perfil' component={ListaRestaurante} />
            <PrivateRoute path='/Restaurante/Editar' component={EditarRestaurante} />


            <PrivateRoute path='/Operador/Lista' component={ListaOperador} />
            <PrivateRoute path='/Operador/Cadastrar' component={CadastrarOperador} />



            <PrivateRoute path='/Cardapio/Lista' component={ListaCardapio} />
            <PrivateRoute path='/Cardapio/Cadastrar' component={CadastrarCardapio} />
            <PrivateRoute path='/Cardapio/Editar' component={EditarCardapio} />


            <PrivateRoute path='/Menu/Lista' component={ListaMenu} />
            <PrivateRoute path='/Menu/Editar' component={EditarMenu} />


            <Redirect from='*' to='/Gerenciamento' />

          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;