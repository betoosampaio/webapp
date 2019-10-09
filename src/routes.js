import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';



import SignIn from './Components/SignIn/SignIn';
import App from './Components/App/App';
import Login from './Components/Login/Login'
import home from '../src/Components/WebSite/Home'
import Socket from './Components/Teste/Socket'



function Routes() {
  return (
    <BrowserRouter>
      <Switch>
      <Route path='/web/home' component={home} />
    
        <Route path='/SignIn' component={SignIn} />
        <Route path='/Login' component={Login} />
        <Route path='/Socket' component={Socket} />
        <Route component={App}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;