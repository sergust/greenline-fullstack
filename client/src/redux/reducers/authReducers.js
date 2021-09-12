import { AUTH_SUCCESS, AUTH_LOGOUT, USER_LOADED } from "../actions/action.types";


const authReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { userInfo: action.payload };
    case AUTH_LOGOUT:
      return {};
    case USER_LOADED:
      return {
        ...state,
        currentUserDetail: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
