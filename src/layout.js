import React from 'react';

import {classes, is_defined, is_empty, is_array} from './utils.js';

import './layout.css';

export const Layout = props => {
  let {className, flex, align, ...other} = props;

  let css = className;

  if (is_defined(flex)) {
    if (is_empty(flex) || flex === true) {
      flex = 'row';
    }
    css = classes('flex', flex, css);
  }

  if (is_defined(align)) {
    if (is_array(align)) {
      css = classes('justify-' + align[0], 'align-' + align[1], css);
    }
    else {
      css = classes('justify-' + align, css);
    }
  }

  return (
    <div {...other} className={css}/>
  );
};

Layout.propTypes = {
  className: React.PropTypes.string,
  flex: React.PropTypes.oneOf(['row', 'column', true]),
  align: React.PropTypes.string,
};

export default Layout;

// vim: set ts=2 sw=2 tw=80:
