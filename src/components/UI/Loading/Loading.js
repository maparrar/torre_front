import React from 'react';

import classes from './Loading.module.css';

const Loading = props => (
  <>
    {props.isVisible && <div className={classes.loading}>
      <div className={classes.loader} />
    </div>}
  </>
);

export default Loading;
