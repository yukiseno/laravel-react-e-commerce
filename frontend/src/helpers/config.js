import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export const axiosRequest = axios.create({
  baseURL: baseURL + "/api/",
});

export const getConfig = (token, contentType) => {
  const config = {
    headers: {
      "Content-type": contentType || "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return config;
};
