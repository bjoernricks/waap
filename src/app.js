import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
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

export default App;

// vim: set ts=2 sw=2 tw=80:
