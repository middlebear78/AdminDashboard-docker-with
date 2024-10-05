import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import store from "../store"; // Adjust the path to your store file
import { RootState } from "../reducers/index"; // Adjust the import path to your User model

// Function to get the auth token from the Redux store

export const getAuthToken = (): string | null => {
    const state = store.getState() as RootState;
    if (state && state.user && state.user.token) {
        return state.user.token;
    }
    console.error("Token is missing");
    return null;
};

// Create an Axios instance
const api = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to add the auth token
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token = getAuthToken();
        if (token && config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`; // Commonly use 'Authorization' header
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// Response interceptor for centralized error handling
api.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
            // Handle 401 errors globally (unauthorized)
            console.error("Unauthorized - Session expired");
            // You might want to redirect the user to the login page or refresh the token
        }
        return Promise.reject(error);
    }
);

export default api;
