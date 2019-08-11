import {combineReducers} from "redux";
import authReducer from "./authReducer";
import messagesReducer from "./messagesReducer";
import usersReducer from "./usersReducer";

export default combineReducers({
  auth: authReducer,
  messages: messagesReducer,
  users: usersReducer
});
