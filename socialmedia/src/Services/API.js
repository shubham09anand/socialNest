import axios from "axios";

const API = axios.create({ baseURL: 'https://apisocialnest.shubham09anand.in/auth' });

API.interceptors.request.use((req) => {
  return req;
});

export default API;
