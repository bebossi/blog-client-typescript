import axios, { AxiosRequestConfig, AxiosHeaders } from "axios";

const apiURLs = {
  development: "http://localhost:5555",
};

const api = axios.create({ baseURL: apiURLs["development"] });

api.interceptors.request.use((config) => {
  const loggedInUserJSON = localStorage.getItem("loggedInUser");

  const parseLoggedInUser = JSON.parse(loggedInUserJSON || '""');

  if (parseLoggedInUser.token) {
    (config as AxiosRequestConfig).headers = {
      ...(config.headers as AxiosHeaders),
      Authorization: `Bearer ${parseLoggedInUser.token}`,
    };
  }

  return config;
});

export { api };
