import axios from "axios";

const API_BASE_URL = "https://inqool-interview-api.vercel.app/api/";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export default axiosInstance;
