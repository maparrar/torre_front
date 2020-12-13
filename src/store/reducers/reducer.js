import * as actionTypes from '../actions/actionTypes';
import {deepCopy} from "../../Util/util";

const initialState = {
  username: '',
  user: {
    locale: null,
    name: null,
    pictureThumbnail: null,
    professionalHeadline: null,
    strengths: []
  },
  opportunities: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USERNAME:
      return {
        ...state,
        username: action.username
      }
    case actionTypes.SET_USER:
      return {
        ...state,
        user: {
          locale: action.locale,
          name: action.name,
          pictureThumbnail: action.pictureThumbnail,
          professionalHeadline: action.professionalHeadline,
          strengths: deepCopy(action.strengths)
        }
      }
    case actionTypes.SET_OPPORTUNITIES:
      return {
        ...state,
        opportunities: deepCopy(action.opportunities)
      }
    default:
      return {
        ...state
      }
  }
};

export default reducer;
