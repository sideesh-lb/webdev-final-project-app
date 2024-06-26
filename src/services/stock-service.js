import { thirdPartyClient } from "../clients/axiosClients";

const API_BASE = "https://yh-finance.p.rapidapi.com";
const API_KEY = "249ccaf1eamshf53cc28facd0888p1d76d3jsn29ef4514da90";
// const API_KEY = "647d2802a9msh97fe2ab26f3ecbcp1a165cjsnb227259c30f0";
// const API_KEY = "627382bf47mshe5322c7bc1b19cfp12f47cjsn858845e8d27e";
const headers = {
  "X-RapidAPI-Key": API_KEY,
  "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
};

export const getStockData = async () => {
  const options = {
    method: "GET",
    url: `${API_BASE}/market/get-trending-tickers`,
    headers,
  };
  const response = await thirdPartyClient.request(options);
  console.log("response");
  return response.data.finance.result[0].quotes;
};

export const getStockDetails = async (symbol) => {
  console.log("Symbol for getting details: ", symbol);
  const options = {
    method: "GET",
    url: `${API_BASE}/stock/v2/get-summary?symbol=${symbol.trim()}`,
    headers,
  };
  const response = await thirdPartyClient.request(options);
  console.log("Response details: ", response.data);
  return response.data;
};
