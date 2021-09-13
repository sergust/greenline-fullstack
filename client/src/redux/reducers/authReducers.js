import {
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  USER_LOADED,
  PASSWORD_CHANGE_REQUEST,
  PASSWORD_CHANGE_FAIL,
  PASSWORD_CHANGE_SUCCESS,
} from "../actions/action.types";

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

export const changePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case PASSWORD_CHANGE_REQUEST:
      return { loading: true };
    case PASSWORD_CHANGE_SUCCESS:
      return { success: true};
    case PASSWORD_CHANGE_FAIL:
      return {
        errorMsg: "Unable to change password",
      };
    default:
      return state;
  }
};

export default authReducer;
