import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';



import SignIn from './Components/SignIn/SignIn';
import App from './Components/App/App';
import Login from './Components/Login/Login'



function Routes() {
  return (
    <BrowserRouter>
      <Switch>
    
        <Route path='/SignIn' component={SignIn} />
        <Route path='/Login' component={Login} />
        <Route component={App}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;