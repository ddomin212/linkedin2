import { SET_LOADING_STATUS, GET_CONTACTS } from "../actions/actionType";
export const initState = {
  contacts: [],
  loading: false,
};
function contactReducer(state = initState, action) {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    case SET_LOADING_STATUS:
      return {
        ...state,
        loading: action.status,
      };
    default:
      return state;
  }
}

export default contactReducer;
