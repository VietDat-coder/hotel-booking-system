import api from './apiClient';

const createBooking = async (payload) => {
  const res = await api.post('/api/bookings', payload);
  return res.data;
};

const getMyBookings = async (params) => {
  const res = await api.get('/api/bookings/my', { params });
  return res.data;
};

export default { createBooking, getMyBookings };

