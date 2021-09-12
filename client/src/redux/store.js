import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from "./index";

const middleware = [thunk];

const userInfo = localStorage.getItem("userInfo");
const userInfoFromStorage = userInfo ? JSON.parse(userInfo) : null;

const initialState = {
  auth: {userInfo: userInfoFromStorage}
}

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;