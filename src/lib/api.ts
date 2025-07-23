import axios from "axios";

const API_LOGIN = "https://reqres.in/api/login";
const API_ORDERS = "https://67aa117865ab088ea7e58c36.mockapi.io/api/v1/order";

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(API_LOGIN, { email, password });
  return response.data;
};

export const getOrders = async (token: string) => {
  const response = await axios.get(API_ORDERS, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
