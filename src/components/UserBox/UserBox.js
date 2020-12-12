import React, {useState} from "react";
import { connect } from "react-redux";

import * as actionTypes from '../../store/actions/actionTypes';

const UserBox = props => {
  const [username, setUsername] = useState('');

  const changeUsernameHandler = e => {
    console.log(e);
    setUsername(e.target.value);
  };

  const goButtonHandler = () => {
    if(username.length){
      props.doSetUser(username);
    }
  }

  return <div>
    <input placeholder='Write the username' value={username} onChange={changeUsernameHandler}/>
    <button onClick={goButtonHandler}>Go</button>
  </div>
};

const mapDispatchToProps = dispatch => {
  return {
    doSetUser: username => dispatch({type: actionTypes.SET_USERNAME, username: username}),
  }
};

export default connect(null, mapDispatchToProps) (UserBox);
