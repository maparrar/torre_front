import React from 'react';

import UserBox from "../UserBox/UserBox";

import classes from './Header.module.css';

const Header = () => (
  <header className={classes.header}>
    <div className={classes.text}><h2>Skills Viewer</h2></div>
    <div className={classes.userBox}><UserBox /></div>
  </header>
);

export default Header;
