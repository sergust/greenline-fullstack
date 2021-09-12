import axios from "axios";
import { FAIL } from "./action.types";
import { API } from "../../backend";
import { ORDER_TYPES } from "../types/order";

//get all the post
export const getOrders = (skip, limit) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_TYPES["LOADING_ORDER"], payload: true });

    //get authentication token from the user
    const { auth } = getState();
    const {
      userInfo: { token },
    } = auth;
    const URL = `${API}/order`;

    //setting header
    const config = {
      headers: {
        "X-Auth-Token": `${token}`,
      },
      params: {
        skip,
        limit,
      },
    };

    const {
      data: { data },
    } = await axios.get(URL, config);

    dispatch({ type: ORDER_TYPES["GET_ORDERS"], payload: data });
    dispatch({ type: ORDER_TYPES["LOADING_POST"], payload: false });
  } catch (err) {
    dispatch({
      type: FAIL,
      payload: err.response?.data ? err.response.data.msg : err.message,
    });
  }
};

// Place an order
export const placeOrder = (order) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const {
      userInfo: { token },
    } = auth;
    const URL = `${API}/order`;

    const config = {
      headers: {
        "X-Auth-Token": `${token}`,
      },
      // params: {
      //   ...order,
      // },
    };

    const {
      data: { data },
    } = await axios.post(URL, order, config);

    console.log(data);
  } catch (e) {
    console.error(e);
  }
};
