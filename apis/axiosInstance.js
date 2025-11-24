import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

console.log("🌍 Using API:", process.env.EXPO_PUBLIC_API_BASE_URL);

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response) console.error("API Error:", error.response.data);
    else if (error.request) console.error("No response from server:", error.request);
    else console.error("Request error:", error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
