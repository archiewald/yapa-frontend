import axios from "axios";
import { store } from "store";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

// https://github.com/axios/axios#interceptors
axiosInstance.interceptors.request.use(
  config => {
    store.dispatch("setIsLoading", true);

    return config;
  },
  error => {
    store.dispatch("setIsLoading", false);

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  config => {
    store.dispatch("setIsLoading", false);

    return config;
  },
  error => {
    store.dispatch("setIsLoading", false);

    return Promise.reject(error);
  }
);
