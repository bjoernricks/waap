import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import 'daap.js';

class Login extends React.Component {
  render() {
    return (
     <main>
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
      </main>
    );
  }
}

export default Login;

// vim: set ts=2 sw=2 tw=80:
