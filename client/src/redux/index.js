import { combineReducers } from "redux";

import auth from "./reducers/authReducers";
import request from "./reducers/requestReducers";
import fail from "./reducers/failReducers";
import homePosts from "./reducers/postReducers";
import profile from "./reducers/profileReducers";
import message from "./reducers/messageReducer";
import socket from "./reducers/socketReducer";
import order from "./reducers/orderReducer";

export default combineReducers({
  auth,
  request,
  fail,
  homePosts,
  profile,
  socket,
  message,
  order,
});
