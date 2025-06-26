
import axios from "axios";
import { BACKEND_URL } from "@env";

const PORT = 8002;

const axiosInstance = axios.create({
  baseURL: BACKEND_URL, // Replace with your backend URL
  withCredentials: true, // Ensures cookies are sent with requests
});

export default axiosInstance;
