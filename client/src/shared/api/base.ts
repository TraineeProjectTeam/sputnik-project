import axios from 'axios';
import Cookies from 'js-cookie';

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    config.headers.Authorization = token ? `Bearer ${token}` : undefined;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiInstance;
