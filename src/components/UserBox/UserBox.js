import React, {useState, useEffect} from "react";
import { connect } from "react-redux";

import * as actionTypes from '../../store/actions/actionTypes';

import classes from './UserBox.module.css';

const UserBox = props => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    if(props.username){
      setUsername(props.username);
    }
  }, [props.username]);

  const changeUsernameHandler = e => setUsername(e.target.value);
  const keyDownHandler = e => {
    if (e.key === 'Enter' && username.length) {
      props.doSetUsername(username)
    }
  }

  return <div className={classes.wrapper}>
    <input
      placeholder='Look by username'
      value={username}
      onChange={changeUsernameHandler}
      onKeyDown={keyDownHandler}
    />
  </div>
};

const mapStateToProps = state => ({
  username: state.username
});

const mapDispatchToProps = dispatch => ({
  doSetUsername: username => dispatch({type: actionTypes.SET_USERNAME, username: username}),
});

export default connect(mapStateToProps, mapDispatchToProps) (UserBox);
