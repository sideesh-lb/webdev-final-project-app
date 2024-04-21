import { createSlice } from "@reduxjs/toolkit";
import {
  countHowManyCommentsThunk,
  createCommentThunk,
  deleteCommentThunk,
  findCommentsThunk,
  updateCommentThunk,
  resetCommentsThunk,
} from "../services/comments/comment-thunk";
import { countHowManyLikesThunk } from "../services/likes/like-thunk";

const initialState = {
  comments: [],
  count: 0,
  loading: true,
};

const commentReducer = createSlice({
  name: "comments",
  initialState: initialState,
  extraReducers: {
    [countHowManyCommentsThunk.fulfilled]: (state, action) => {
      console.log("countHowManyCommentsThunk: ", action, state);
      state.count = action.payload;
    },
    [findCommentsThunk.fulfilled]: (state, action) => {
      state.comments = action.payload;
    },
    [createCommentThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.comments.push(payload);
    },
    [createCommentThunk.pending]: (state, { payload }) => {
      state.loading = true;
      console.log("Create comment still in pending state");
    },
    [updateCommentThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      const commentIndex = state.comments.findIndex(
        (c) => c._id === payload._id
      );
      state.comments[commentIndex] = {
        ...state.comments[commentIndex],
        ...payload,
      };
    },
    [resetCommentsThunk.fulfilled]: (state) => {
      state.comments = [];
      state.count = 0;
    },
    [deleteCommentThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.comments = state.comments.filter((c) => c._id !== payload);
    },
  },
});

export default commentReducer.reducer;
