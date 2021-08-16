import {
    REQUEST
} from "../actions/action.types";


const requestReducer = (state = {}, action) => {
    switch (action.type) {
      case REQUEST:
        return action.payload;
      default:
        return state;
    }
  };

export default requestReducer;
  