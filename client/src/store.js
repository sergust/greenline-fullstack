import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const reducer = combineReducers({});

const initialState = {};

const middleware = [thunk];

// const userInfo = localStorage.getItem("userInfo");
// const userInfoFromStorage = userInfo ? JSON.parse(userInfo) : null;

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;