import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.token
      }
    default:
      return {
        ...state
      }
  }
};

export default reducer;
