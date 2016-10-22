import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import {Daap} from 'daap.js';

import App, {daap} from './app.js';
import Login from './login.js';
import Main from './main.js';

import './index.css';

const is_connected = (next_state, replace) => {
  if (daap.status < Daap.Status.HasRevision) {
    replace({
      pathname: '/login',
      state: {
        next: next_state.location.pathname
      }
    });
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/login" component={Login}/>
      <Route path="/" component={Main} onEnter={is_connected}/>
    </Route>
  </Router>,
  document.getElementById('root')
);

// vim: set ts=2 sw=2 tw=80:
