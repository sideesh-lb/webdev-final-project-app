import axios from "axios";
import * as stockService from "../stock-service";

const BASE_URL = "http://localhost:4000";

const STOCKS_API = `${BASE_URL}`;

const api = axios;

export const toggleLike = async (uid, sid) => {
  const response = await api.put(`${STOCKS_API}/users/${uid}/likes/${sid}`);
  console.log("---Like data: ", response.data);
  return response.data;
};

export const countHowManyLikes = async (sid) => {
  const response = await api.get(`${STOCKS_API}/stocks/${sid}/likesCount`);
  return response.data;
};

export const findUserLikesStock = async (uid, sid) => {
  const response = await api.get(`${STOCKS_API}/users/${uid}/likes/${sid}`);
  return !!response.data;
};

export const findAllStocksLikedByUser = async (userId) => {
  console.log("Inside findAllStocksLikedByUser");
  const response = await api.get(`${STOCKS_API}/users/${userId}/likedStocks`);
  console.log("caughtresponse",response.data)
  return response.data;
};
