import api from './apiClient';

const listHotels = async (params) => {
  const res = await api.get('/api/hotels', { params });
  return res.data;
};

const getHotel = async (id) => {
  const res = await api.get(`/api/hotels/${id}`);
  return res.data;
};

export default { listHotels, getHotel };

