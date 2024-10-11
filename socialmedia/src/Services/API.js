import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_BASE_URL_LOCAL });

API.interceptors.request.use((req) => {
  return req;
});

export default API;
