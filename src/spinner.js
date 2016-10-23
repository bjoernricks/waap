import React from 'react';

import RefreshIndicator from 'material-ui/RefreshIndicator';

import {classes} from './utils.js';

import './spinner.css';

const style = {
  display: 'inline-block',
  position: 'relative',
};

export const Spinner = ({color}) => {
  return (
    <div className="spinner">
      <RefreshIndicator
        size={40}
        left={0}
        top={0}
        status="loading"
        style={style}
      />
    </div>
  );
};

Spinner.propTypes = {
  color: React.PropTypes.string,
};

export default Spinner;

// vim: set ts=2 sw=2 tw=80:
