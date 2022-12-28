import { GET_FRIENDS } from "../actions/actionType";
export const initState = {
  friends: [],
};
function friendReducer(state = initState, action) {
  switch (action.type) {
    case GET_FRIENDS:
      return {
        ...state,
        friends: action.payload,
      };
    default:
      return state;
  }
}

export default friendReducer;
