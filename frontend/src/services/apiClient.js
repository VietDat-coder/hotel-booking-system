import axios from 'axios';
import { store } from '../store';
import { logout } from '../store/slices/authSlice';
import { getErrorMessage } from '../utils/errorUtils';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      // Auto attach JWT token
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = getErrorMessage(error);
    if (error.response && error.response.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(new Error(message));
  }
);

export default api;

