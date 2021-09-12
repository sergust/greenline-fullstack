import axios from "axios";
import { API } from "../backend";

export const getDataAPI = async (url, token) => {
  const res = await axios.get(`${API}/${url}`, {
    headers: { "X-Auth-Token": token },
  });
  return res;
};

export const postDataAPI = async (url, post, token) => {
  const res = await axios.post(`${API}/${url}`, post, {
    headers: { "X-Auth-Token": token },
  });
  return res;
};
