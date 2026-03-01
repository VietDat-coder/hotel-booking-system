import { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import hotelService from '../../services/hotelService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const AdminHotelsPage = () => {
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
      const data = await hotelService.listHotels({ page: 0, size: 100 });
      setHotels(data.content || []);
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
      if (editing) {
        await adminService.updateHotel(editing.id, values);
        toast.success('Hotel updated');
      } else {
        await adminService.createHotel(values);
        toast.success('Hotel created');
      }
      reset();
      setEditing(null);
      load();
    } catch (err) {
      toast.error(err.message || 'Failed to save hotel');
    }
  };

  const handleEdit = (hotel) => {
    setEditing(hotel);
    reset(hotel);
  };

  const handleDelete = async (hotel) => {
    if (!window.confirm('Delete this hotel?')) return;
    try {
      await adminService.deleteHotel(hotel.id);
      toast.success('Hotel deleted');
      load();
    } catch (err) {
      toast.error(err.message || 'Failed to delete');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Manage hotels</h1>
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr,1fr] gap-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-gray-600">Name</th>
                <th className="px-3 py-2 text-left font-medium text-gray-600">City</th>
                <th className="px-3 py-2 text-left font-medium text-gray-600">Rating</th>
                <th className="px-3 py-2 text-right font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map((h) => (
                <tr key={h.id} className="border-t">
                  <td className="px-3 py-2">{h.name}</td>
                  <td className="px-3 py-2">{h.city}</td>
                  <td className="px-3 py-2">{h.rating}</td>
                  <td className="px-3 py-2 text-right space-x-2">
                    <button
                      className="text-xs text-primary-600 hover:underline"
                      onClick={() => handleEdit(h)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-xs text-red-600 hover:underline"
                      onClick={() => handleDelete(h)}
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
            {editing ? `Edit hotel #${editing.id}` : 'Create new hotel'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-sm">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                {...register('name')}
                className="w-full border border-gray-300 rounded-md px-2 py-1.5"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">City</label>
              <input
                {...register('city')}
                className="w-full border border-gray-300 rounded-md px-2 py-1.5"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Address</label>
              <input
                {...register('address')}
                className="w-full border border-gray-300 rounded-md px-2 py-1.5"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                {...register('description')}
                className="w-full border border-gray-300 rounded-md px-2 py-1.5"
                rows={3}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Rating</label>
              <input
                type="number"
                step="0.1"
                {...register('rating')}
                className="w-full border border-gray-300 rounded-md px-2 py-1.5"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Thumbnail URL</label>
              <input
                {...register('thumbnail')}
                className="w-full border border-gray-300 rounded-md px-2 py-1.5"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-3 py-1.5 bg-primary-600 text-white rounded-md text-xs font-medium hover:bg-primary-700 disabled:opacity-60"
              >
                {editing ? 'Update' : 'Create'}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    reset({});
                  }}
                  className="px-3 py-1.5 border border-gray-300 text-xs rounded-md"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminHotelsPage;

