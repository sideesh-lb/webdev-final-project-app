import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_URL = `${BASE_URL}/stocks`;

export const createStock = async (newStock) => {
  console.log("Before calling backend");
  const response = await axios.post(API_URL, newStock);
  const actualStock = response.data;
  console.log("Service called, stock returned is :", actualStock);
  return actualStock;
};
export const findAllStocks = async () => {
  const response = await axios.get(API_URL);
  const stocks = response.data;
  return stocks;
};
export const updateMovie = async () => {};
export const deleteStock = async (sid) => {
  const response = await axios.delete(`${API_URL}/${sid}`);
  const status = response.data;
  return sid;
};
