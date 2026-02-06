import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api",
  withCredentials: false, // useful later for auth
});

export default API;
