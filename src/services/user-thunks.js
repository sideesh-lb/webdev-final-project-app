import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./user-service";

export const getAllUsersThunk = createAsyncThunk(
  "user/getAllUsers",
  async () => {
    let users = await service.getAllUsers();
    return users;
  }
);

export const deleteUserThunk = createAsyncThunk(
  "users/deleteUser",
  async (userId) => {
    await service.deleteUser(userId);
    return userId;
  }
);

export const findUserByIdThunk = createAsyncThunk(
    "findUserById",
    async (userId) => {
        return await service.findUserById(userId);
    }
);
