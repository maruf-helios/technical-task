import { combineReducers } from "redux";
import userReducer from "../Reducers/UserReducer";

const rootReducer = combineReducers({
  userState: userReducer,
});

export default rootReducer;
