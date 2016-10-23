import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import {Daap} from 'daap.js';

injectTapEventPlugin();

export const daap = new Daap();

export class App extends Component {

  getChildContext() {
    return {daap};
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="app">
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
