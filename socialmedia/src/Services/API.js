import axios from "axios";

const API = axios.create({ baseURL: 'http://13.202.210.238:8080/auth' });

API.interceptors.request.use((req) => {
  return req;
});

export default API;
