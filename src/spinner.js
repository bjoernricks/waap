import React from 'react';

import ReactSpinner from 'react-spinner';

import {classes} from './utils.js';

import './spinner.css';

export const Spinner = ({color}) => {
  return (
    <div className={classes('spinner', color)}>
      <ReactSpinner/>
    </div>
  );
};

Spinner.propTypes = {
  color: React.PropTypes.string,
};

export default Spinner;
