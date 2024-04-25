import { apiClient } from "../clients/axiosClients";

const API_BASE = process.env.REACT_APP_BASE_URL;

export const login = async (email, password) => {
  let body = { email, password };
  alert(`${API_BASE}/login`);
  let response = await apiClient.post(`${API_BASE}/login`, body);
  return response.data;
};

export const update = async ( updatedUser) => {
  let body = { user:updatedUser};
  let response = await apiClient.put(`${API_BASE}/users/update`, body);
  return response.data;
};

export const addBookMark = async ( email, bookMark) => {
  let body = { email,bookMark};
  let response = await apiClient.put(`${API_BASE}/users/addBookmark`, body);
  return response.data;
};

export const getAllUsers = async () => {
  let response = await apiClient.get(`${API_BASE}/users`);
  return response.data;
};

export const deleteUser = async (userId) => {
  let response = await apiClient.delete(`${API_BASE}/users/${userId}`);
  console.log("Deleting user: ", userId);
  console.log(response);
  return response.data;
};

export const findUserById = async (userId) => {
  console.log("Reached findUserById!")
  const response = await apiClient.get(`${API_BASE}/users/${userId}`);
  console.log("Response from findUserById :", response.data)
  return response.data;
}

export const profile = async () => {
  const response = await apiClient.get(`${API_BASE}/profile`)
  console.log(response.data);
  return response.data;
}

export const userLogout = async () => {
  let response = await apiClient.post(`${API_BASE}/logout`);
};
    

