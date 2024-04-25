
import { apiClient } from "../../clients/axiosClients";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = `${BASE_URL}/stocks`;


export const createStock = async (newStock) => {
  console.log("Before calling backend");
  const response = await apiClient.post(API_URL, newStock);
  const actualStock = response.data;
  console.log("Service called, stock returned is :", actualStock);
  return actualStock;
};
export const findAllStocks = async () => {
  const response = await apiClient.get(API_URL);
  const stocks = response.data;
  return stocks;
};
export const updateMovie = async () => {};
export const deleteStock = async (sid) => {
  const response = await apiClient.delete(`${API_URL}/${sid}`);
  const status = response.data;
  return sid;
};
