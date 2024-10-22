import axios from "axios";

const API = axios.create({ baseURL: 'https://apisocialnest.shubham09anand.in/auth' });
// const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL_NETWORK });

API.interceptors.request.use((req) => {
  return req;
});

export default API;
