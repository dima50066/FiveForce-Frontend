import axios from 'axios';

const API_URL = 'https://fiveforce-aquatrack.onrender.com';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const getToken = () => localStorage.getItem('token');

const setAuthHeader = token => {
  localStorage.setItem('token', token);
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  localStorage.removeItem('token');
  delete axiosInstance.defaults.headers.common['Authorization'];
};

axiosInstance.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export { setAuthHeader, clearAuthHeader };
export default axiosInstance;
