import { SET_USER, GET_USERS } from "../actions/actionType";

const INITIAL_STATE = {
  user: null,
  users: [],
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
export default userReducer;
