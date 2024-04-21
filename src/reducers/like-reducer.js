import { createSlice } from "@reduxjs/toolkit";
import {
  countHowManyLikesThunk,
  findAllStocksLikedByUserThunk,
  findUserLikesStockThunk,
  toggleLikeThunk,
  resetLikesThunk,
} from "../services/likes/like-thunk";

const initialState = {
  likes: {
    count: 0,
    userLiked: false,
    likedStocks: [],
  },
  loading: true,
};

const likeReducer = createSlice({
  name: "likes",
  initialState: initialState,
  extraReducers: {
    [countHowManyLikesThunk.fulfilled]: (state, action) => {
    
      state.likes.count = action.payload;
    },
    [findUserLikesStockThunk.fulfilled]: (state, action) => {
      state.likes.userLiked = action.payload;
    },
    [toggleLikeThunk.fulfilled]: (state, action) => {
      state.likes.count = action.payload.count;
      state.likes.userLiked = action.payload.userLiked;
    },
    

    [findAllStocksLikedByUserThunk.pending]: (state) => {
      state.loading = true;
    
    },
    [findAllStocksLikedByUserThunk.fulfilled]: (state, { payload }) => {

      state.loading = false;
      state.likes.likedStocks = payload;
      console.log("like reduceder payload",payload)
    },
    [findAllStocksLikedByUserThunk.rejected]: (state,{payload}) => {
      console.log("rejected state", payload)
      state.likes.likedStocks = false;

    },
  },
});

export default likeReducer.reducer;
