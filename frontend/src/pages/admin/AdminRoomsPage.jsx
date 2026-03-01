import { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import roomService from '../../services/roomService';
import hotelService from '../../services/hotelService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { formatCurrency } from '../../utils/formatUtils';

const AdminRoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm();

  const load = async () => {
    setLoading(true);
    try {
      const [roomsData, hotelsData] = await Promise.all([
        roomService.listRooms(),
        hotelService.listHotels({ page: 0, size: 100 })
      ]);
      setRooms(roomsData || []);
      setHotels(hotelsData.content || []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        hotelId: Number(values.hotelId),
        price: Number(values.price),
        capacity: Number(values.capacity),
        quantity: Number(values.quantity)
      };
      if (editing) {
        await adminService.updateRoom(editing.id, payload);
        toast.success('Room updated');
      } else {
        await adminService.createRoom(payload);
        toast.success('Room created');
      }
      reset();
      setEditing(null);
      load();
    } catch (err) {
      toast.error(err.message || 'Failed to save room');
    }
  };

  const handleEdit = (room) => {
    setEditing(room);
    reset({
      ...room
    });
  };

  const handleDelete = async (room) => {
    if (!window.confirm('Delete this room?')) return;
    try {
      await adminService.deleteRoom(room.id);
      toast.success('Room deleted');
      load();
    } catch (err) {
      toast.error(err.message || 'Failed to delete');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Manage rooms</h1>
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr,1fr] gap-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-gray-600">Type</th>
                <th className="px-3 py-2 text-left font-medium text-gray-600">Hotel</th>
                <th className="px-3 py-2 text-left font-medium text-gray-600">Price</th>
                <th className="px-3 py-2 text-right font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="px-3 py-2">{r.roomType}</td>
                  <td className="px-3 py-2">
                    {hotels.find((h) => h.id === r.hotelId)?.name || r.hotelId}
                  </td>
                  <td className="px-3 py-2">{formatCurrency(r.price)}</td>
                  <td className="px-3 py-2 text-right space-x-2">
                    <button
                      className="text-xs text-primary-600 hover:underline"
                      onClick={() => handleEdit(r)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-xs text-red-600 hover:underline"
                      onClick={() => handleDelete(r)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 space-y-3">
          <h2 className="font-semibold text-sm mb-2">
            {editing ? `Edit room #${editing.id}` : 'Create new room'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-sm">
            <div>
              <label className="block mb-1 font-medium">Hotel</label>
              <select
                {...register('hotelId')}
                className="w-full border border-gray-300 rounded-md px-2 py-1.5"
              >
                <option value="">Select hotel</option>
                {hotels.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Room type</label>
              <input
                {...register('roomType')}
                className="w-full border border-gray-300 rounded-md px-2 py-1.5"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Price</label>
              <input
                type="number"
                step="0.01"
                {...register('price')}
                className="w-full border border-gray-300 rounded-md px-2 py-1.5"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-1 font-medium">Capacity</label>
                <input
                  type="number"
                  {...register('capacity')}
                  className="w-full border border-gray-300 rounded-md px-2 py-1.5"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Quantity</label>
                <input
                  type="number"
                  {...register('quantity')}
                  className="w-full border border-gray-300 rounded-md px-2 py-1.5"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                {...register('description')}
                className="w-full border border-gray-300 rounded-md px-2 py-1.5"
                rows={3}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-3 py-1.5 bg-primary-600 text-white rounded-md text-xs font-medium hover:bg-primary-700 disabled:opacity-60"
            >
              {editing ? 'Update' : 'Create'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminRoomsPage;

