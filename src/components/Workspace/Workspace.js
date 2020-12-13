import React from 'react';

import classes from './Workspace.module.css';

const Workspace = props => (
  <div className={classes.workspace}>
    {props.children}
  </div>
);

export default Workspace;
