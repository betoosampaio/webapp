import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';



import SignIn from './Components/SignIn/SignIn';
import App from './Components/App/App';
import Login from './Components/Login/Login'
import home from '../src/Components/WebSite/Home'



function Routes() {
  return (
    <BrowserRouter>
      <Switch>
      <Route path='/web/home' component={home} />
    
        <Route path='/SignIn' component={SignIn} />
        <Route path='/Login' component={Login} />
        <Route component={App}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;