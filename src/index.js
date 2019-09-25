import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Route from './routes';

ReactDOM.render(<Route/>, document.getElementById('root'));
serviceWorker.unregister();
