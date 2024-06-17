import axios from 'axios';

const apiInstance = axios.create({
  baseURL: ``, // TODO: вставить baseURL
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiInstance;