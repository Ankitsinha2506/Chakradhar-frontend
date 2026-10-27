import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// An explicit URL also supports testing the deployed API from localhost.
// Android's emulator reaches the development computer through 10.0.2.2.
const localHost = Platform.OS === "android" ? "10.0.2.2" : "localhost";
const baseURL = (
  process.env.EXPO_PUBLIC_API_BASE_URL ||
  (__DEV__
    ? `http://${localHost}:5001/api`
    : "https://chakradhar-backend.onrender.com/api")
).replace(/\/+$/, "");

console.log("🌍 Using API:", baseURL);

const axiosInstance = axios.create({
  baseURL,
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
