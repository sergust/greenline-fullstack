import axios from "axios";
import {FAIL, REQUEST} from "../actions/action.types";
import {API} from "../../backend";

export const PROFILE_TYPES = {
  LOADING: "LOADING_PROFILE",
  GET_USER: "GET_PROFILE_USER",
  FOLLOW: "FOLLOW",
  UNFOLLOW: "UNFOLLOW",
  GET_ID: "GET_PROFILE_ID",
  GET_POSTS: "GET_PROFILE_POSTS",
  UPDATE_POST: "UPDATE_PROFILE_POSTS",
  UPDATE_USER_PROFILE: "UPDATE_USER_PROFILE"
};

export const getProfileUsers =
  ({ userId }) =>
  async (dispatch, getState) => {
    dispatch({ type: PROFILE_TYPES.GET_ID, payload: userId });

    try {
      dispatch({ type: PROFILE_TYPES.LOADING, payload: true });

      //get authentication token from the user
      const { auth } = getState();
      const {
        userInfo: { token },
      } = auth;
      const URL = `${API}/profile/${userId}`;

      //setting header
      var config = {
        headers: {
          "X-Auth-Token": `${token}`,
        },
      };

      const { data } = await axios.get(URL, config);

      dispatch({ type: PROFILE_TYPES.GET_USER, payload: data });

      dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
    } catch (err) {
      dispatch({
        type: FAIL,
        payload:
          err.response?.data
            ? err.response.data.msg
            : err.message,
      });
    }
  };

  export const updateProfileUser = (userData) => async (dispatch, getState) => {
    if(!userData?.user.name){
      return dispatch({type: FAIL, payload: {error: "Name field cannot be empty."}})
    }
  
    try {
       //get authentication token from the user
       const { auth } = getState();
       const {
         userInfo: { token, userId },
       } = auth;
       const URL = `${API}/profile`;
 
       //setting header
       var config = {
         headers: {
           "X-Auth-Token": `${token}`,
         },
       };
 
      dispatch({
        type: REQUEST,
        payload: { loading: true }
      });
  
      const res = await axios.post(URL, userData, config);
  
      dispatch({
        type: PROFILE_TYPES.UPDATE_USER_PROFILE,
        payload: {data: userData, userId}
      })
  
    } catch (err) {
      dispatch({
        type: FAIL,
        payload: { error: err.response.data.msg },
      });
    }
  
  };

  //get all the post
export const getProfilePost = (skip, limit) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROFILE_TYPES.LOADING, payload: true });

    //get authentication token from the user
    const { auth } = getState();
    const {
      userInfo: { token, userId },
    } = auth;
    const URL = `${API}/profile/admin/${userId}/${skip}/${limit}`;

    //setting header
    var config = {
      headers: {
        "X-Auth-Token": `${token}`,
      }
    };

    const { data } = await axios.get(URL, config);


    dispatch({ type: PROFILE_TYPES.GET_POSTS, payload: data["data"] });

    dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
  } catch (err) {
    dispatch({
      type: FAIL,
      payload: err.response?.data ? err.response.data.msg : err.message,
    });
  }
};
  
