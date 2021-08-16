import { combineReducers } from "redux";

import auth from "./reducers/authReducers";
import request from "./reducers/requestReducers";
import fail from "./reducers/failReducers";
import homePosts from './reducers/postReducers';
import profile from "./reducers/profileReducers";

export default combineReducers({
    auth,
    request,
    fail,
    homePosts,
    profile
})