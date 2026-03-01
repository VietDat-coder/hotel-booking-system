import api from './apiClient';

const listRooms = async (params) => {
  const res = await api.get('/api/rooms', { params });
  return res.data;
};

const getRoom = async (id) => {
  const res = await api.get(`/api/rooms/${id}`);
  return res.data;
};

export default { listRooms, getRoom };

