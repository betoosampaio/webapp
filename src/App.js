import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Carregando...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/login/Login'));
const Registrar = React.lazy(() => import('./views/registrar/Registrar'));
const Page401 = React.lazy(() => import('./views/pages/401'));
const Page404 = React.lazy(() => import('./views/pages/404'));
const Page500 = React.lazy(() => import('./views/pages/500'));

class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" name="Login" render={props => <Login {...props}/>} />
              <Route exact path="/registrar" name="Registrar" render={props => <Registrar {...props}/>} />
              <Route exact path="/401" name="401" render={props => <Page401 {...props}/>} />
              <Route exact path="/404" name="404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;