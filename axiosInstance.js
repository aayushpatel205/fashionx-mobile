import axios from "axios";
import Constants from "expo-constants";
const BACKEND_URL =
  Constants.manifest.extra.BACKEND_URL || process.env.BACKEND_URL;

const PORT = 8002;

const axiosInstance = axios.create({
  baseURL: BACKEND_URL, // Replace with your backend URL
  withCredentials: true, // Ensures cookies are sent with requests
});

export default axiosInstance;
