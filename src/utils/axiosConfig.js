import axios from 'axios';

const API_URL = 'https://five-force-aqua-track.vercel.app';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

let token = null;

export const setAuthHeader = newToken => {
  token = newToken;
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  token = null;
  delete axiosInstance.defaults.headers.common['Authorization'];
};

axiosInstance.interceptors.request.use(
  config => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default axiosInstance;
