import { POST_TYPES } from "./postAction";
import { PROFILE_TYPES } from "./profileAction";
import axios from "axios";
import { FAIL } from "./action.types";
import { API } from "../../backend";

export const createComment =
  (targetPost, postComment) => async (dispatch, getState) => {
    try {
      //get authentication token from the user
      const { auth } = getState();
      const {
        userInfo: { token, userId },
        currentUserDetail,
      } = auth;

      const URL = `${API}/comment/post/${targetPost._id}`;

      var config = {
        headers: {
          "X-Auth-Token": `${token}`,
        },
      };

      const newComment = {
        commentText: postComment,
      };

      const { data } = await axios.post(URL, newComment, config);
      const newPost = {
        ...targetPost,
        comments: [
          ...targetPost.comments,
          {
            ...newComment,
            _id: data._id,
            commentBy: {
              _id: userId,
              name: `${currentUserDetail?.name}`,
              avatar: `${currentUserDetail?.avatar}`,
            },
          },
        ],
      };
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
      dispatch({ type: PROFILE_TYPES.UPDATE_POST, payload: newPost });
    } catch (err) {
      dispatch({ type: FAIL, payload: { error: err.response.data.msg } });
    }
  };

export const updateComment =
  (newComment, post) => async (dispatch, getState) => {
    try {
      //get authentication token from the user
      const { auth } = getState();
      const {
        userInfo: { token },
      } = auth;

      const URL = `${API}/comment/update/${newComment._id}`;

      var config = {
        headers: {
          "X-Auth-Token": `${token}`,
        },
      };

      await axios.put(URL, { ...newComment }, config);

      const newPost = {
        ...post,
        comments: post.comments.map(c => c._id === newComment._id ? newComment : c)
      };

      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
      dispatch({ type: PROFILE_TYPES.UPDATE_POST, payload: newPost });
    } catch (err) {
      dispatch({ type: FAIL, payload: { error: err.response.data.msg } });
    }
  };

export const deleteComment = (cmtId, post) => async (dispatch, getState) => {
  try {
    //get authentication token from the user
    const { auth } = getState();
    const {
      userInfo: { token },
    } = auth;

    const URL = `${API}/comment/delete/${cmtId}`;

    var config = {
      headers: {
        "X-Auth-Token": `${token}`,
      },
    };

    const newPost = {
      ...post,
      comments: post.comments.filter((cm) => cm._id !== cmtId),
    };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    dispatch({ type: PROFILE_TYPES.UPDATE_POST, payload: newPost });

    await axios.delete(URL, config);
  } catch (err) {
    dispatch({
      type: FAIL,
      payload: { error: err.response.data.msg },
    });
  }
};
