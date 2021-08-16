import { POST_TYPES } from "../actions/postAction";

const initialState = {
  loading: false,
  posts: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_TYPES.CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };

    case POST_TYPES.LOADING_POST:
      return {
        ...state,
        loading: action.payload,
      };

    case POST_TYPES.GET_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.data],
        size: action.payload.size
      };

    case POST_TYPES.UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(item => (item._id === action.payload._id ? action.payload : item)),
      };

    case POST_TYPES.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };

    default:
      return state;
  }
};

export default postReducer;