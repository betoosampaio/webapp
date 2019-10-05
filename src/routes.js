import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';



import SignIn from './Components/SignIn/SignIn';
import Socket from './Components/Teste/Socket';
import App from './Components/App/App';



function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/SignIn' component={SignIn} />
        <Route path='/Socket' component={Socket} />
        <Route component={App}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
