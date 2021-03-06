import { combineReducers } from "redux";

import auth, {changePasswordReducer} from "./reducers/authReducers";
import request from "./reducers/requestReducers";
import fail from "./reducers/failReducers";
import homePosts from "./reducers/postReducers";
import profile, {changeAvatarReducer} from "./reducers/profileReducers";
import message from "./reducers/messageReducer";
import socket from "./reducers/socketReducer";
import order from "./reducers/orderReducer";
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
} from "./reducers/productReducers";
import {
  categoryListReducer,
  categoryCreateReducer,
  categoryDeleteReducer
} from "./reducers/categoryReducers";
import {
  videoCreateReducer,
  videoListReducer,
  videoDeleteReducer
} from "./reducers/videoReducers";

export default combineReducers({
  auth,
  request,
  fail,
  homePosts,
  profile,
  socket,
  message,
  order,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  categoryList: categoryListReducer,
  categoryCreate: categoryCreateReducer,
  categoryDelete: categoryDeleteReducer,
  videoCreate: videoCreateReducer,
  videoList: videoListReducer,
  videoDelete: videoDeleteReducer,
  passwordChange: changePasswordReducer,
  avatarChange: changeAvatarReducer,
});