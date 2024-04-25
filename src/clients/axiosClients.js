import axios from "axios";

export const apiClient = axios.create({
    withCredentials: true
});

export const thirdPartyClient = axios.create({
});

export const alphaClient = axios.create({
});