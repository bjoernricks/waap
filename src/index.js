import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import App from './app';
import Login from './login';
import Main from './main';

import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/login" component={Login}/>
      <Route path="/" component={Main}/>
    </Route>
  </Router>,
  document.getElementById('root')
);

// vim: set ts=2 sw=2 tw=80:
