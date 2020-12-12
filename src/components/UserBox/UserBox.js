import React, {useState, useEffect} from "react";
import { connect } from "react-redux";

import * as actionTypes from '../../store/actions/actionTypes';

const UserBox = props => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    if(props.username){
      setUsername(props.username);
    }
  }, [props.username]);

  const changeUsernameHandler = e => setUsername(e.target.value);
  const goButtonHandler = () => username.length && props.doSetUsername(username);

  return <div>
    <input placeholder='Write the username' value={username} onChange={changeUsernameHandler}/>
    <button onClick={goButtonHandler}>Go</button>
  </div>
};

const mapStateToProps = state => ({
  username: state.username
});

const mapDispatchToProps = dispatch => ({
  doSetUsername: username => dispatch({type: actionTypes.SET_USERNAME, username: username}),
});

export default connect(mapStateToProps, mapDispatchToProps) (UserBox);
