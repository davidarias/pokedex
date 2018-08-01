import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import List from './components/List';
import Details from './components/Details';

import registerServiceWorker from './registerServiceWorker';

import { Router, Route, hashHistory, IndexRedirect} from 'react-router';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/list" />

      <Route path="/list" component={List}/>
      <Route path="/details/:name" component={Details}/>
    </Route>
  </Router>
), document.getElementById('root'));
registerServiceWorker();
