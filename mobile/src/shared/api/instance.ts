import axios from 'axios';
import { API_URL } from '@env';
import { storage } from '../libs/storage';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(function (config) {
  const token = storage.getString('access_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';

  return config;
});
