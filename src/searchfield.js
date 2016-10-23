import React from 'react';

import TextField from 'material-ui/TextField';
import Search from 'material-ui/svg-icons/action/search';

import {is_defined} from './utils.js';


export class SearchField extends React.Component {

  constructor(...args) {
    super(...args);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let {onChange} = this.props;

    if (is_defined(onChange)) {
      onChange(event.target.value);
    }
  }

  render() {
    let {hintText, className} = this.props;

    if (is_defined(hintText)) {
      hintText = "Search"
    }
    return (
      <div className={className}>
        <TextField hintText={hintText} onChange={this.handleChange}/>
        <Search/>
      </div>
    );
  }
}

SearchField.propTypes = {
  onChange: React.PropTypes.func,
  hintText: React.PropTypes.string,
}

export default SearchField;

// vim: set ts=2 sw=2 tw=80:
