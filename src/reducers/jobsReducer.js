import { SET_LOADING_STATUS, GET_JOBS } from "../actions/actionType";
export const initState = {
  jobs: [],
  loading: false,
};
function jobsReducer(state = initState, action) {
  switch (action.type) {
    case GET_JOBS:
      return {
        ...state,
        jobs: action.payload,
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

export default jobsReducer;
