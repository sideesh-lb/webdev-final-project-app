import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./bookmark-service.js";

export const getAllBookMarksThunk = createAsyncThunk(
  "getBookMarks",
  async (userEmail) => {
    let bookmarks = await service.getBookMarks(userEmail);
    return bookmarks;
  }
);

export const deleteBookmarkThunk = createAsyncThunk(
    "users/deleteBookMark",
    async (userEmail, url) => {
      await service.deleteBookMark(userEmail,url);
      return url;
    }
  );