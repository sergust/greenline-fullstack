import { combineReducers } from "redux";

import auth from "./reducers/authReducers";
import request from "./reducers/requestReducers";
import fail from "./reducers/failReducers";
import homePosts from "./reducers/postReducers";
import profile from "./reducers/profileReducers";
import message from "./reducers/messageReducer";
import socket from "./reducers/socketReducer";
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
  videoListReducer
} from "./reducers/videoReducers";



export default combineReducers({
  auth,
  request,
  fail,
  homePosts,
  profile,
  socket,
  message,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  categoryList: categoryListReducer,
  categoryCreate: categoryCreateReducer,
  categoryDelete: categoryDeleteReducer,
  videoCreate: videoCreateReducer,
  videoList: videoListReducer,
});
