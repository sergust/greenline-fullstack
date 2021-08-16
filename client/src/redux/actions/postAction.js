import axios from "axios";
import { REQUEST, FAIL } from "./action.types";
import { API } from "../../backend";

export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
  LOADING_POST: "LOADING_POST",
  GET_POSTS: "GET_POSTS",
  UPDATE_POST: "UPDATE_POST",
  GET_POST: "GET_POST",
  DELETE_POST: "DELETE_POST",
};

//create new post
export const createPost =
  ({ body, postPicture }, author) =>
  async (dispatch, getState) => {
    try {
      //get authentication token from the user
      const { auth } = getState();
      const {
        userInfo: { token },
      } = auth;

      const URL = `${API}/post/create`;
      dispatch({ type: REQUEST, payload: { loading: true } });

      var config = {
        headers: {
          "X-Auth-Token": `${token}`,
        },
      };

      const { data } = await axios.post(URL, { body, postPicture }, config);

      dispatch({
        type: POST_TYPES.CREATE_POST,
        payload: { ...data, author },
      });

      dispatch({ type: REQUEST, payload: { loading: false } });
    } catch (err) {
      dispatch({
        type: FAIL,
        payload:
          err.response && err.response.data
            ? err.response.data.msg
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

//get all the post
export const getPosts = (skip, limit) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_TYPES.LOADING_POST, payload: true });

    //get authentication token from the user
    const { auth, homePosts } = getState();
    const {
      userInfo: { token },
    } = auth;
    const { posts } = homePosts;
    const URL = `${API}/post`;

    //setting header
    var config = {
      headers: {
        "X-Auth-Token": `${token}`,
      },
      params: {
        skip,
        limit,
      },
    };

    const { data } = await axios.get(URL, config);

    dispatch({ type: POST_TYPES.GET_POSTS, payload: data });

    dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
  } catch (err) {
    dispatch({
      type: FAIL,
      payload: err.response?.data ? err.response.data.msg : err.message,
    });
  }
};

//update the post
export const updatePost =
  ({ body, postPicture, postId }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: REQUEST, payload: { loading: true } });

      //get authentication token from the user
      const { auth } = getState();
      const {
        userInfo: { token },
      } = auth;
      const URL = `${API}/post/update/${postId}`;

      //setting header
      var config = {
        headers: {
          "X-Auth-Token": `${token}`,
        },
      };

      const { data } = await axios.put(URL, { body, postPicture }, config);

      dispatch({ type: POST_TYPES.UPDATE_POST, payload: data });
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

//like and unlike the post
export const likePost = (targetPost) => async (dispatch, getState) => {
  //get authentication token from the user
  const { auth } = getState();
  const {
    userInfo: { token, userId },
  } = auth;
  const newPost = { ...targetPost, likes: [...targetPost.likes, userId] };
  dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

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

export const unlikePost = (targetPost) => async (dispatch, getState) => {
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

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
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

//get post by an ID
export const getPost =
  ({ detailPost, postId }) =>
  async (dispatch, getState) => {
    if (detailPost.every((post) => post._id !== postId)) {
      try {
        //get authentication token from the user
        const { auth } = getState();
        const {
          userInfo: { token },
        } = auth;

        const URL = `${API}/post/${postId}`;
        //setting header
        var config = {
          headers: {
            "X-Auth-Token": `${token}`,
          },
        };

        const { data } = await axios.get(URL, config);
        dispatch({ type: POST_TYPES.GET_POST, payload: data });
      } catch (err) {
        dispatch({
          type: FAIL,
          payload:
            err.response && err.response.data.errors[0].msg
              ? err.response.data.errors[0].msg
              : err.message,
        });
      }
    }
  };

//delete the post
export const deletePost = (postId) => async (dispatch, getState) => {
  try {
    const isConfirm = window.confirm("Are you sure you want to delete?");
    if (!isConfirm) return;
    dispatch({ type: POST_TYPES.DELETE_POST, payload: postId });

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
