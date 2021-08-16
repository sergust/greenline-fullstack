import { POST_TYPES } from "./postAction";
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

      const newPost = {
        ...targetPost,
        comments: [
          ...targetPost.comments,
          {
            ...newComment,
            commentBy: {
              _id: userId,
              name: `${currentUserDetail?.name}`,
              avatar: `${currentUserDetail?.avatar}`,
            },
          },
        ],
      };

      await axios.post(URL, newComment, config);
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    } catch (err) {
      dispatch({ type: FAIL, payload: { error: err.response.data.msg } });
    }
  };

// export const updateComment = ({comment, post, content, auth}) => async (dispatch) => {
//   const newComments = EditData(post.comments, comment._id, {...comment, content});
//   const newPost = {...post, comments: newComments};

//   dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost});

//   try {
//     await patchDataAPI(`comment/${comment._id}`, { content }, auth.token);

//   } catch (err) {
//     dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}});
//   }
// };

// export const likeComment= ({comment, post, auth}) => async (dispatch) => {
//     const newComment = {...comment, likes: [...comment.likes, auth.user]};
//      const newComments = EditData(post.comments, comment._id, newComment);
//      const newPost = { ...post, comments: newComments };

//     dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
//     try {
//         await patchDataAPI(`comment/${comment._id}/like`, null, auth.token);
//     } catch (err) {
//         dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}});

//     }
// };

// export const unLikeComment = ({ comment, post, auth }) => async (dispatch) => {
//   const newComment = { ...comment, likes: DeleteData(comment.likes, auth.user._id) };
//   const newComments = EditData(post.comments, comment._id, newComment);
//   const newPost = { ...post, comments: newComments };

//   dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
//   try {
//     await patchDataAPI(`comment/${comment._id}/unlike`, null, auth.token);

//   } catch (err) {
//     dispatch({
//       type: GLOBALTYPES.ALERT,
//       payload: { error: err.response.data.msg },
//     });
//   }
// };

export const deleteComment = (cmtId, post) => async (dispatch, getState) => {
  try {
      //get authentication token from the user
      const { auth } = getState();
      const {
        userInfo: { token }
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

    await axios.delete(URL, config);
  } catch (err) {
    dispatch({
      type: FAIL,
      payload: { error: err.response.data.msg },
    });
  }
};
