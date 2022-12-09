import { combineReducers } from "redux";
import userReducer from "./userReducer";
import jobsReducer from "./jobsReducer";
import articleReducer from "./articleReducer";
const rootReducer = combineReducers({
  userState: userReducer,
  jobsState: jobsReducer,
  articleState: articleReducer,
});

export default rootReducer;
