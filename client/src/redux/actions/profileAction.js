import axios from "axios";
import { FAIL, REQUEST } from "../actions/action.types";
import { API } from "../../backend";

export const PROFILE_TYPES = {
  LOADING: "LOADING_PROFILE",
  GET_USER: "GET_PROFILE_USER",
  FOLLOW: "FOLLOW",
  UNFOLLOW: "UNFOLLOW",
  GET_ID: "GET_PROFILE_ID",
  GET_POSTS: "GET_PROFILE_POSTS",
  UPDATE_POST: "UPDATE_PROFILE_POSTS",
  DELETE_POST: "DELETE_PROFILE_POSTS",
  UPDATE_USER_PROFILE: "UPDATE_USER_PROFILE",
  CREATE_PROFILE_POST: "CREATE_PROFILE_POST",
  GET_MEMBERS: "GET_MEMBERS",
  ADD_MEMBERS: "ADD_MEMBERS",
  REMOVE_MEMBERS: "REMOVE_MEMBERS",
};

export const getMembers =
  (following) =>
  async (dispatch, getState) => {
    try {
      //get authentication token from the user
      const { auth } = getState();
      const {
        userInfo: { token },
      } = auth;
      
      const URL = `${API}/profile/get/memberlist`;

      //setting header
      var config = {
        headers: {
          "X-Auth-Token": `${token}`,
        },
      };

      const { data } = await axios.post(URL, { following:  following }, config);

      dispatch({ type: PROFILE_TYPES.GET_MEMBERS, payload: data });
    } catch (err) {
      dispatch({
        type: FAIL,
        payload: err.response?.data ? err.response.data.msg : err.message,
      });
    }
  };

  export const addMembers =
  (followId) =>
  async (dispatch, getState) => {
    try {
      //get authentication token from the user
      const { auth } = getState();
      const {
        userInfo: { token, userId },
      } = auth;
      
      const URL = `${API}/profile/follow`;

      //setting header
      var config = {
        headers: {
          "X-Auth-Token": `${token}`,
        },
      };

      const { data } = await axios.put(URL, { followId, userId }, config);

      dispatch({ type: PROFILE_TYPES.ADD_MEMBERS, payload: data });
    } catch (err) {
      dispatch({
        type: FAIL,
        payload: err.response?.data ? err.response.data.error : err.message,
      });
    }
  };


  export const deleteMembers =
  (unfollowId) =>
  async (dispatch, getState) => {
    try {
      //get authentication token from the user
      const { auth } = getState();
      const {
        userInfo: { token, userId },
      } = auth;
      
      const URL = `${API}/profile/unfollow`;

      //setting header
      var config = {
        headers: {
          "X-Auth-Token": `${token}`,
        },
      };

      await axios.put(URL, { unfollowId, userId }, config);

      dispatch({ type: PROFILE_TYPES.REMOVE_MEMBERS, payload: unfollowId });
    } catch (err) {
      console.log(err);
      dispatch({
        type: FAIL,
        payload: err.response?.data ? err.response.data.msg : err.message,
      });
    }
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
        payload: err.response?.data ? err.response.data.msg : err.message,
      });
    }
  };


export const updateProfileUser = (userData) => async (dispatch, getState) => {
  if (!userData?.user.name) {
    return dispatch({
      type: FAIL,
      payload: { error: "Name field cannot be empty." },
    });
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
      payload: { loading: true },
    });

    const res = await axios.post(URL, userData, config);

    dispatch({
      type: PROFILE_TYPES.UPDATE_USER_PROFILE,
      payload: { data: userData, userId },
    });
  } catch (err) {
    dispatch({
      type: FAIL,
      payload: { error: err.response.data.msg },
    });
  }
};

//get all the post
export const getProfilePost = (skip, limit, managerId=null) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROFILE_TYPES.LOADING, payload: true });

    //get authentication token from the user
    const { auth } = getState();
    const {
      userInfo: { token, userId },
    } = auth;
    let URL;

    if(!managerId) {
      URL = `${API}/profile/admin/${userId}/${skip}/${limit}`;
    } else {
      URL = `${API}/profile/member/${userId}/${managerId}/${skip}/${limit}`
    }

    //setting header
    var config = {
      headers: {
        "X-Auth-Token": `${token}`,
      },
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


//like and unlike the post
export const likeProfilePost = (targetPost) => async (dispatch, getState) => {
  //get authentication token from the user
  const { auth } = getState();
  const {
    userInfo: { token, userId },
  } = auth;
  const newPost = { ...targetPost, likes: [...targetPost.likes, userId] };
  dispatch({ type: PROFILE_TYPES.UPDATE_POST, payload: newPost });

  try {
    const URL = `${API}/post/like/${targetPost._id}`;

    //setting header
    var config = {
      headers: {
        "X-Auth-Token": `${token}`,
      },
    };

    await axios.put(URL, {}, config);
  } catch (err) {
    dispatch({
      type: FAIL,
      payload:
        err.response && err.response.data.errors[0].msg
          ? err.response.data.errors[0].msg
          : err.message,
    });
  }
};

export const unlikeProfilePost = (targetPost) => async (dispatch, getState) => {
  try {
    //get authentication token from the user
    const { auth } = getState();
    const {
      userInfo: { token, userId },
    } = auth;

    const newPost = {
      ...targetPost,
      likes: [...targetPost.likes].filter((item) => item !== userId),
    };

    dispatch({ type: PROFILE_TYPES.UPDATE_POST, payload: newPost });
    //setting header
    var config = {
      headers: {
        "X-Auth-Token": `${token}`,
      },
    };

    const URL = `${API}/post/like/${targetPost._id}`;
    await axios.put(URL, {}, config);
  } catch (err) {
    dispatch({
      type: FAIL,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};

//delete the post
export const deleteProfilePost = (postId) => async (dispatch, getState) => {
  try {
    const isConfirm = window.confirm("Are you sure you want to delete?");
    if (!isConfirm) return;
    dispatch({ type: PROFILE_TYPES.DELETE_POST, payload: postId });

    //get authentication token from the user
    const { auth } = getState();
    const {
      userInfo: { token },
    } = auth;
    const URL = `${API}/post/delete/${postId}`;

    //setting header
    var config = {
      headers: {
        "X-Auth-Token": `${token}`,
      },
    };

    await axios.delete(URL, config);
  } catch (err) {
    dispatch({
      type: FAIL,
      payload: err.response.data.error,
    });
  }
};
