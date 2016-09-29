import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import 'daap.js';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to waap</h2>
          </div>
          <div>
            <TextField
              defaultValue="127.0.0.1"
              floatingLabelText="Server"/>
          </div>
          <div>
            <TextField
              defaultValue="3689"
              floatingLabelText="Port"/>
          <div>
          </div>
            <TextField
              floatingLabelText="Password"
              type="password"/>
          </div>
          <div>
            <RaisedButton label="Login" primary={true}/>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

// vim: set ts=2 sw=2 tw=80:
