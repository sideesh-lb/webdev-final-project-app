import { alphaClient, thirdPartyClient } from "../clients/axiosClients";

const API_BASE = "https://www.alphavantage.co/query";
const API_KEY = "9OPKFZCS44JJPATL";
const NEWS_API = `${API_BASE}?function=NEWS_SENTIMENT&apikey=${API_KEY}`;


export const getAllNews = async () => {
  const response = await alphaClient.get(
    `${NEWS_API}&limit=12&topics=finance:technology`
  );
  const news = response.data.feed;
  console.log(response);
  console.log(news.slice(0, 12));
  return news.slice(0, 12);
};

export const getRecommendedNews = async (symbol) => {
  const response = await alphaClient.get(`${NEWS_API}&tickers=${symbol}`);
  const news = response.data.feed;
  return news.slice(0, 6);
};