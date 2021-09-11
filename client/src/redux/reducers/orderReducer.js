import { ORDER_TYPES } from "../types/order";

const initialState = {
  loading: false,
  orders: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_TYPES.GET_ORDERS:
      return {
        ...state,
        orders: [...action.payload],
      };

    default:
      return state;
  }
};

export default orderReducer;
