import api from './apiClient';

const login = async (payload) => {
  const res = await api.post('/api/auth/login', payload);
  return res.data;
};

const register = async (payload) => {
  const res = await api.post('/api/auth/register', payload);
  return res.data;
};

const me = async () => {
  const res = await api.get('/api/auth/me');
  return res.data;
};

export default { login, register, me };

