import {
  VIDEO_LIST_REQUEST,
  VIDEO_LIST_SUCCESS,
  VIDEO_LIST_FAIL,
  VIDEO_CREATE_REQUEST,
  VIDEO_CREATE_SUCCESS,
  VIDEO_CREATE_FAIL,
  VIDEO_CREATE_RESET,
  VIDEO_DELETE_REQUEST,
  VIDEO_DELETE_SUCCESS,
  VIDEO_DELETE_FAIL
} from "../actions/action.types";

//get all the categories
export const videoListReducer = (state = { videos: [] }, action) => {
  switch (action.type) {
    case VIDEO_LIST_REQUEST:
      return { loading: true, videos: [] };
    case VIDEO_LIST_SUCCESS:
      return {
        loading: false,
        videos: action.payload,
      };
    case VIDEO_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//create category
export const videoCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case VIDEO_CREATE_REQUEST:
      return { loading: true };
    case VIDEO_CREATE_SUCCESS:
      return { loading: false, success: true, video: action.payload };
    case VIDEO_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case VIDEO_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

//delete category
export const videoDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case VIDEO_DELETE_REQUEST:
      return { loading: true };
    case VIDEO_DELETE_SUCCESS:
      return { loading: false, success: true };
    case VIDEO_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
