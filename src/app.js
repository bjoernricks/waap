import React, { Component } from 'react';

import logo from './logo.svg';
import './app.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Daap} from 'daap.js';

export const daap = new Daap();

class App extends Component {

  getChildContext() {
    return {daap};
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to waap</h2>
          </div>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

App.childContextTypes = {
  daap: React.PropTypes.object,
};

export default App;

// vim: set ts=2 sw=2 tw=80:
