import axios from "axios";
import {
  VIDEO_LIST_REQUEST,
  VIDEO_LIST_SUCCESS,
  VIDEO_LIST_FAIL,
  VIDEO_CREATE_REQUEST,
  VIDEO_CREATE_SUCCESS,
  VIDEO_CREATE_FAIL,
  VIDEO_CREATE_RESET
} from "./action.types";
import { API } from "../../backend";

const getConfig = (userToken) => {
  //setting header
  var config = {
    headers: {
      "X-Auth-Token": `${userToken}`,
    },
  };

  return config;
};

export const listVideos = (token) => async (dispatch) => {
  try {
    dispatch({ type: VIDEO_LIST_REQUEST });

    const { data } = await axios.get(
      `${API}/video`,
      getConfig(token)
    );

    dispatch({
      type: VIDEO_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VIDEO_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const deleteVideo = (id, token) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: CATEGORY_DELETE_REQUEST,
//     });

//     await axios.delete(`${API}/category/delete/${id}`, getConfig(token));

//     dispatch({
//       type: CATEGORY_DELETE_SUCCESS,
//     });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({
//       type: CATEGORY_DELETE_FAIL,
//       payload: message,
//     });
//   }
// };

export const createVideo = (token, newVideo) => async (dispatch) => {
  try {
    dispatch({
      type: VIDEO_CREATE_REQUEST,
    });

    const { data } = await axios.post(`${API}/video/create`, newVideo, getConfig(token));

    dispatch({
      type: VIDEO_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: VIDEO_CREATE_FAIL,
      payload: message,
    });
  } finally {
    dispatch({
      type: VIDEO_CREATE_RESET
    })
  }
};
