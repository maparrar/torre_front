import * as actionTypes from '../actions/actionTypes';
import {deepCopy} from "../../Util/util";

const initialState = {
  token: null,
  username: '',
  locale: null,
  initOpportunities: false,
  opportunities: []
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
    case actionTypes.SET_LOCALE:
      return {
        ...state,
        locale: action.locale
      }
    case actionTypes.SET_INIT_OPPORTUNITIES:
      return {
        ...state,
        initOpportunities: action.initOpportunities
      }
    case actionTypes.DROP_OPPORTUNITIES:
      return {
        ...state,
        initOpportunities: true,
        opportunities: []
      }
    case actionTypes.ADD_OPPORTUNITIES:
      const newOpportunities = deepCopy(state.opportunities);
      return {
        ...state,
        opportunities: newOpportunities.concat(action.opportunities)
      }
    default:
      return {
        ...state
      }
  }
};

export default reducer;
