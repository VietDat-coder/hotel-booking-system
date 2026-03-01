import api from './apiClient';

const listUsers = async () => {
  const res = await api.get('/api/admin/users');
  return res.data;
};

const listBookings = async (params) => {
  const res = await api.get('/api/admin/bookings', { params });
  return res.data;
};

const dashboardSummary = async () => {
  const res = await api.get('/api/admin/dashboard/summary');
  return res.data;
};

const createHotel = async (payload) => {
  const res = await api.post('/api/admin/hotels', payload);
  return res.data;
};

const updateHotel = async (id, payload) => {
  const res = await api.put(`/api/admin/hotels/${id}`, payload);
  return res.data;
};

const deleteHotel = async (id) => {
  await api.delete(`/api/admin/hotels/${id}`);
};

const createRoom = async (payload) => {
  const res = await api.post('/api/admin/rooms', payload);
  return res.data;
};

const updateRoom = async (id, payload) => {
  const res = await api.put(`/api/admin/rooms/${id}`, payload);
  return res.data;
};

const deleteRoom = async (id) => {
  await api.delete(`/api/admin/rooms/${id}`);
};

export default {
  listUsers,
  listBookings,
  dashboardSummary,
  createHotel,
  updateHotel,
  deleteHotel,
  createRoom,
  updateRoom,
  deleteRoom
};

