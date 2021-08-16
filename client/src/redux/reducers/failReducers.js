import {
    FAIL
} from "../actions/action.types";


const failReducer = (state = {}, action) => {
    switch (action.type) {
      case FAIL:
        return { errorMsg: action.payload };
      default:
        return state;
    }
  };

export default failReducer;
  