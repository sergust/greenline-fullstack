import axios from "axios";
import {
  REQUEST,
  FAIL,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  USER_LOADED,
  PASSWORD_CHANGE_REQUEST,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_FAIL,
} from "./action.types";
import { API } from "../../backend";

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REQUEST, payload: { loading: true } });

      const { data } = await axios.post(`${API}/auth`, {
        email,
        password,
      });

      dispatch({ type: AUTH_SUCCESS, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));

      dispatch({ type: REQUEST, payload: { loading: false } });
    } catch (err) {
      dispatch({
        type: FAIL,
        payload:
          err.response && err.response.data.errors[0].msg
            ? err.response.data.errors[0].msg
            : err.message,
      });
    } finally {
      dispatch({
        type: REQUEST,
        payload: { loading: false },
      });
      dispatch({
        type: FAIL,
        payload: "",
      });
    }
  };
};

//register new user
export const register = (userData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REQUEST, payload: { loading: true } });

      const { data } = await axios.post(`${API}/users`, userData);

      dispatch({ type: AUTH_SUCCESS, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));

      dispatch({ type: REQUEST, payload: { loading: false } });
    } catch (err) {
      dispatch({
        type: FAIL,
        payload:
          err.response && err.response.data.errors[0].msg
            ? err.response.data.errors[0].msg
            : err.message,
      });
    } finally {
      dispatch({
        type: REQUEST,
        payload: { loading: false },
      });
      dispatch({
        type: FAIL,
        payload: "",
      });
    }
  };
};

//CHANGE USER PASSWORD
export const changePassword = (token, userData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PASSWORD_CHANGE_REQUEST, payload: { loading: true } });

      var config = {
        headers: {
          "X-Auth-Token": `${token}`,
        },
      };

      const { data } = await axios.put(`${API}/users/change/password`, userData, config);

      dispatch({ type: PASSWORD_CHANGE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: PASSWORD_CHANGE_FAIL,
        payload:
          err.response && err.response.data.errors[0].msg
            ? err.response.data.errors[0].msg
            : err.message,
      }) 
}}}


//register new user
export const loadUser = () => {
  return async (dispatch, getState) => {
    try {
      const { auth } = getState();
      const {
        userInfo: { token },
      } = auth;

      var config = {
        headers: {
          "X-Auth-Token": `${token}`,
        },
      };

      const { data } = await axios.get(`${API}/users`, config);

      dispatch({
        type: USER_LOADED,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: FAIL,
        payload: err.response?.data.msg ? err.response?.data.msg : err.message,
      });
    }
  };
};

//logout user
export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: AUTH_LOGOUT });
    window.location.href = "/login";
  };
};
