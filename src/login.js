import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      port: '3689',
      server: '127.0.0.1',
      password: '',
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onPortChange = this.onPortChange.bind(this);
    this.onServerChange = this.onServerChange.bind(this);
  }

  handleLogin(event) {
    let {daap, router} = this.context;
    let {server, port, password} = this.state;

    this.setState({error: undefined});

    daap.setServer(server, port);
    daap.setPassword(password);
    daap.login().then(() => {
        router.replace('/');
    }).catch(error => {
      console.log(error);
      this.setState({error: '' + error});
    });
  }

  onServerChange(event) {
    this.setState({server: event.target.value});
  }

  onPortChange(event) {
    console.log('setting port', event.target.value);
    this.setState({port: event.target.value});
  }

  onPasswordChange(event) {
    this.setState({password: event.target.value});
  }

  render() {
    let {server, port, password, error} = this.state;
    return (
     <main>
        {error &&
          <div>
            An error occured {error}
          </div>
        }
        <div>
          <TextField
            value={server}
            onChange={this.onServerChange}
            floatingLabelText="Server"/>
        </div>
        <div>
          <TextField
            value={port}
            onChange={this.onPortChange}
            floatingLabelText="Port"/>
        <div>
        </div>
          <TextField
            value={password}
            floatingLabelText="Password"
            onChange={this.onPasswordChange}
            type="password"/>
        </div>
        <div>
          <RaisedButton label="Login" primary={true}
            onClick={this.handleLogin}/>
        </div>
      </main>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired,
  daap: React.PropTypes.object.isRequired,
};

export default Login;

// vim: set ts=2 sw=2 tw=80:
