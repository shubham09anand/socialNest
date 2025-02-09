import axios from "axios";

// const API = axios.create({ baseURL: 'https://apisocialnest.shubham09anand.in/auth' });
// const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL_NETWORK });
const API = axios.create({ baseURL: 'http://192.168.1.6:8080/auth' });

API.interceptors.request.use((req) => {
  return req;
});

export default API;
