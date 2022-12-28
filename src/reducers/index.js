import { combineReducers } from "redux";
import userReducer from "./userReducer";
import jobsReducer from "./jobsReducer";
import articleReducer from "./articleReducer";
import cvReducer from "./cvReducer";
import friendReducer from "./friendReducer";
import contactReducer from "./contactReducer";
const rootReducer = combineReducers({
  userState: userReducer,
  jobsState: jobsReducer,
  articleState: articleReducer,
  cvState: cvReducer,
  friendsState: friendReducer,
  contactState: contactReducer,
});

export default rootReducer;
