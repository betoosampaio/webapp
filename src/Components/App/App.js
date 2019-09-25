import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

import GerenciamentoRestaurante from '../Gerenciamento/GerenciamentoRestaurante';
import ListaOperador from '../Operador/ListaOperador';
import CadastrarOperador from '../Operador/CadastrarOperador';
import EditarOperador from '../Operador/EditarOperador';
import ListaCardapio from '../Cardapio/ListaCardapio';
import CadastrarCardapio from '../Cardapio/CadastrarCardapio';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <nav id="menu">
                    <ul>
                        <li> <Link to='/Gerenciamento'>Gerenciamento</Link></li>
                        <li> <Link to='/Operador/Lista'>Operadores</Link></li>
                        <li> <Link to='/Cardapio/Lista'>Cardapios</Link></li>
                        <li style={{ float: 'right' }}> <a href='/Login'>Login</a></li>
                        <li style={{ float: 'right' }}> <a href='/SignIn'>SignIn</a></li>
                    </ul>
                </nav>

                <div className="content">
                    <Switch>
                        <Route path='/Gerenciamento' component={GerenciamentoRestaurante} />
                        <Route path='/Operador/Lista' component={ListaOperador} />
                        <Route path='/Operador/Cadastrar' component={CadastrarOperador} />
                        <Route path='/Operador/Editar' component={EditarOperador} />
                        <Route path='/Cardapio/Lista' component={ListaCardapio} />
                        <Route path='/Cardapio/Cadastrar' component={CadastrarCardapio} />
                        <Redirect from='*' to='/Gerenciamento' />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
