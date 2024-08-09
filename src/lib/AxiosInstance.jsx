import axios from "axios";
import Cookies from "universal-cookie";
import { getSiteURL } from "./get-site-url";
const axiosInstance = axios.create({
  baseURL: `${getSiteURL()}` // Replace with your API base URL
});
axiosInstance.interceptors.request.use(config => {
  // Add custom headers or any other modifications here
  const token = new Cookies().get("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});
export default axiosInstance;