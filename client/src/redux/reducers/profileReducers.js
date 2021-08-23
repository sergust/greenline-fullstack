import { PROFILE_TYPES } from "../actions/profileAction";

const initialState = {
  loading: false,
  ids: [],
  users: [],
  posts: [],
  members: []
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case PROFILE_TYPES.CREATE_PROFILE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };

    case PROFILE_TYPES.GET_MEMBERS:
      return {
        ...state,
        members: action.payload
      };

      case PROFILE_TYPES.ADD_MEMBERS:
        return {
          ...state,
          members: [...state.members, action.payload.user]
        };

    case PROFILE_TYPES.GET_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case PROFILE_TYPES.REMOVE_MEMBERS: {
      return {
        ...state,
        members: state.members.filter(m => m._id !== action.payload)
      }
    }

    case PROFILE_TYPES.GET_ID:
      return {
        ...state,
        ids: [...state.ids, action.payload],
      };
    case PROFILE_TYPES.UPDATE_USER_PROFILE:
      const updatedUserList = [...state.users].filter(
        (item) => item.user._id !== action.payload.userId
      );
      updatedUserList.push(action.payload.data);
      return {
        ...state,
        users: updatedUserList,
      };
    case PROFILE_TYPES.GET_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
      };
    case PROFILE_TYPES.UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };

    case PROFILE_TYPES.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};

export default profileReducer;
