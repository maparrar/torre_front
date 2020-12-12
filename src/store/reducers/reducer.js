import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  username: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.token
      }
    case actionTypes.SET_USERNAME:
      return {
        ...state,
        username: action.username
      }
    default:
      return {
        ...state
      }
  }
};

export default reducer;
