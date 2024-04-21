import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addComment,
  findComments,
  deleteComment,
  updateComment,
  countHowManyComments,
} from "./comment-service";

//Thunk to find all comments for a particular stock
export const findCommentsThunk = createAsyncThunk(
  "findComments",
  async (sid) => {
      console.log("SID => ", sid)
    return await findComments(sid);
  }
);

//Thunk to create a new comment
export const createCommentThunk = createAsyncThunk(
  "addComment",
  async (newCommentBody) => {
    return await addComment(newCommentBody);
  }
);

//Thunk to delete a comment
export const deleteCommentThunk = createAsyncThunk(
  "deleteComment",
  async (deleteObject) => {
    return await deleteComment(deleteObject.userID, deleteObject.commentID);
  }
);

//Thunk to update a comment
export const updateCommentThunk = createAsyncThunk(
  "updateComment",
  async (updateObject) =>
    await updateComment(
      updateObject.userID,
      updateObject.commentID,
      updateObject.commentObject
    )
);

export const countHowManyCommentsThunk = createAsyncThunk(
  "countHowManyComments",
  async (sid) => {
    return await countHowManyComments(sid);
  }
);

export const resetCommentsThunk = createAsyncThunk(
  "resetComments",
  async () => {
    return [];
  }
);
