import { createSlice } from "@reduxjs/toolkit";
import {
  getNewsThunk,
  getRecommendedNewsThunk,
} from "./../services/news-thunks";

const initialState = {
  news: [],
  recommendedNews: [],
  loadingNews: false,
  loadingRecs: false,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  extraReducers: {
    [getNewsThunk.pending]: (state) => {
      state.loadingNews = true;
      state.news = [];
    },
    [getNewsThunk.fulfilled]: (state, { payload }) => {
      state.loadingNews = false;
      state.news = payload;
    },
    [getNewsThunk.rejected]: (state) => {
      state.loadingNews = false;
    },
    [getRecommendedNewsThunk.pending]: (state) => {
      state.loadingRecs = false;
      state.recommendedNews = [];
    },
    [getRecommendedNewsThunk.fulfilled]: (state, { payload }) => {
      state.loadingRecs = false;
      state.recommendedNews = payload;
    },
    [getRecommendedNewsThunk.rejected]: (state) => {
      state.loadingRecs = false;
    },
  },
});

export default newsSlice.reducer;
