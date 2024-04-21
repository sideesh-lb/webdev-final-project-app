import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./stock-service";

export const getStockDataThunk = createAsyncThunk(
  "stock/getStockData",
  async () => {
    let data = await service.getStockData();
    return data;
  }
);

export const getStockDetailsThunk = createAsyncThunk(
  "stock/getStockDetails",
  async (symbol) => {
    let data = await service.getStockDetails(symbol);

    let response = {};

    if (data) {
      response = {
        price: {
          marketPrice: data.price.regularMarketPrice.raw,
          marketOpen: data.price.regularMarketOpen.raw,
          marketClose: data.price.regularMarketPreviousClose.raw,
          marketLow: data.price.regularMarketDayLow.raw,
          marketHigh: data.price.regularMarketDayHigh.raw,
          marketChange: data.price.regularMarketChange.raw,
          marketChangePerc: data.price.regularMarketChangePercent.fmt,
        },
        companySummary: {
          sector: data.summaryProfile.sector,
          fullTimeEmployees: data.summaryProfile.fullTimeEmployees,
          longBusinessSummary: data.summaryProfile.longBusinessSummary,
          country: data.summaryProfile.country,
          website: data.summaryProfile.website,
          industry: data.summaryProfile.industry,
        },
      };
    }

    return response;
  }
);

export const resetStockDetailsThunk = createAsyncThunk(
  "stock/resetStockDetails",
  async () => {
    return null;
  }
);
