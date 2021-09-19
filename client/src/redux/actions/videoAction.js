import axios from "axios";
import {
  VIDEO_LIST_REQUEST,
  VIDEO_LIST_SUCCESS,
  VIDEO_LIST_FAIL,
  VIDEO_CREATE_REQUEST,
  VIDEO_CREATE_SUCCESS,
  VIDEO_CREATE_FAIL,
  VIDEO_CREATE_RESET,
  VIDEO_DELETE_REQUEST,
  VIDEO_DELETE_FAIL,
  VIDEO_DELETE_SUCCESS
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

export const deleteVideo = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: VIDEO_DELETE_REQUEST,
    });

    await axios.delete(`${API}/video/delete/${id}`, getConfig(token));

    dispatch({
      type: VIDEO_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: VIDEO_DELETE_FAIL,
      payload: message,
    });
  }
};

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
