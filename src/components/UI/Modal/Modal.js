import React from "react";

import Backdrop from "./Backdrop/Backdrop";
import Button from "../Button/Button";

import classes from './Modal.module.css';

const Modal = props => (
    props.isVisible && <div>
        <Backdrop onClick={props.onBackDrop}/>
        <div className={classes.Modal} style={{width: props.width ? props.width : null}}>
            <div className={classes.head}>
                <div className={classes.title}>{props.title}</div>
                <div className={classes.closeButton} onClick={props.onClose}>x</div>
            </div>
            <div className={classes.body}>
                <div className={classes.content}>
                    {props.children}
                </div>
            </div>
            <div className={classes.buttons}>
                <Button onClick={props.onOk}>Close</Button>
            </div>
        </div>
    </div>
);

export default Modal;
