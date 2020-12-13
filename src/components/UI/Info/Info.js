import React, {useState} from 'react';

import classes from './Info.module.css';

const Info = () => {
  const [visible, setVisible] = useState(false);

  const clickHandler = () => {
    setVisible(!visible);
  };

  return <div className={classes.info}>
    <div className={classes.icon} onClick={clickHandler}>i</div>
    {visible && <div className={classes.content}>
      <strong><p>Tool for compare jobs' skills required with the strengths of a torre.co user.</p></strong>
      <p>The yellow circle represents the user.</p>
      <p>The white circles are the job offers, and the radius represents the average salary (between min and max) of that offer in USD/month.</p>
      <p>Links between user and offers means that the user have at least one skill required.</p>
      <p>The connected jobs near the user are the jobs with more skills in common with the user.</p>
      <p>Click on an offer for details.</p>
    </div>}
  </div>
};

export default Info;
