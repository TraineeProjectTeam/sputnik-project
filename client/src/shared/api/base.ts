import axios from 'axios';
import { errorHandler, requestHandler, responseHandler } from './interceptors';

const apiInstance = axios.create({
  baseURL: ``, // TODO: вставить baseURL
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
apiInstance.interceptors.request.use(requestHandler);
apiInstance.interceptors.response.use(responseHandler, errorHandler, {});

export default apiInstance;