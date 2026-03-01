import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import roomService from '../../services/roomService';
import bookingService from '../../services/bookingService';
import { formatCurrency } from '../../utils/formatUtils';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
  checkIn: yup.date().required('Check-in is required'),
  checkOut: yup
    .date()
    .required('Check-out is required')
    .min(yup.ref('checkIn'), 'Check-out must be after check-in'),
  paymentMethod: yup.string().required('Payment method is required')
});

const RoomDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await roomService.getRoom(id);
        setRoom(data);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const onSubmit = async (values) => {
    if (!token) {
      toast.error('Please login to book');
      navigate('/login', { state: { from: `/rooms/${id}` } });
      return;
    }
    try {
      const payload = {
        items: [
          {
            roomId: Number(id),
            checkIn: values.checkIn,
            checkOut: values.checkOut
          }
        ],
        paymentMethod: values.paymentMethod
      };
      await bookingService.createBooking(payload);
      toast.success('Booking created successfully');
      navigate('/bookings');
    } catch (err) {
      toast.error(err.message || 'Failed to create booking');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!room) return <div className="container-page">Room not found.</div>;

  return (
    <div className="container-page grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-6">
      <div className="space-y-3 bg-white rounded-lg shadow-sm p-4">
        <h1 className="text-xl font-semibold">{room.roomType}</h1>
        <p className="text-sm text-gray-600">{room.description}</p>
        <p className="text-sm text-gray-600">
          Capacity: {room.capacity} guests • Quantity: {room.quantity}
        </p>
        <p className="font-semibold text-primary-600">{formatCurrency(room.price)}/night</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4 space-y-3">
        <h2 className="font-semibold mb-2">Book this room</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Check-in</label>
            <input
              type="date"
              {...register('checkIn')}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
            {errors.checkIn && (
              <p className="text-xs text-red-600 mt-1">{errors.checkIn.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Check-out</label>
            <input
              type="date"
              {...register('checkOut')}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
            {errors.checkOut && (
              <p className="text-xs text-red-600 mt-1">{errors.checkOut.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Payment method</label>
            <select
              {...register('paymentMethod')}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select method</option>
              <option value="CREDIT_CARD">Credit card (mock)</option>
              <option value="CASH">Cash (mock)</option>
            </select>
            {errors.paymentMethod && (
              <p className="text-xs text-red-600 mt-1">{errors.paymentMethod.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700"
          >
            Confirm booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoomDetailPage;

