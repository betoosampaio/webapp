import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';



import SignIn from './Components/SignIn/SignIn';
import App from './Components/App/App';
import Login from './Components/Login/Login';

import Cadastrar from './Components/Registrar/UserForms';






function Routes() {
  return (
    <BrowserRouter>
      <Switch>


        <Route path='/SignIn' component={SignIn} />


        <Route path='/Login' component={Login} />

        <Route path='/Cadastrar' component={Cadastrar} />

        

        <Route component={App} />


      </Switch>
    </BrowserRouter>
  );
}

export default Routes;