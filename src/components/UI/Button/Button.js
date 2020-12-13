import React from "react";

import classes from './Button.module.css';

const Button = props => (
    <button className={classes.Button} onClick={props.onClick}>
        <p>{props.children}</p>
    </button>
);

export default Button;