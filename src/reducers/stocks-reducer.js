import { createSlice } from "@reduxjs/toolkit";
import {
  getStockDataThunk,
  getStockDetailsThunk,
  resetStockDetailsThunk,
} from "./../services/stock-thunks";

const initialState = {
  stockdata: [],
  currentStockDetails: null,
  loading: false,
};

const stockSlice = createSlice({
  name: "stockdata",
  initialState,
  extraReducers: {
    [getStockDataThunk.pending]: (state) => {
      state.loading = true;
      state.stockdata = [];
    },
    [getStockDataThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.stockdata = payload;
    },
    [getStockDataThunk.rejected]: (state) => {
      state.loading = false;
    },
    [getStockDetailsThunk.pending]: (state) => {},
    [getStockDetailsThunk.fulfilled]: (state, { payload }) => {
      state.currentStockDetails = payload;
    },
    [getStockDetailsThunk.rejected]: (state) => {
      console.log("Error getting Stock Details");
    },
    [resetStockDetailsThunk.fulfilled]: (state, { payload }) => {
      state.currentStockDetails = null;
    },
  },
});

export default stockSlice.reducer;
