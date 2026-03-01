import { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { formatCurrency, formatDate } from '../../utils/formatUtils';

const AdminBookingsPage = () => {
  const [data, setData] = useState({ content: [], totalPages: 0 });
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const load = async (pageIndex = 0) => {
    setLoading(true);
    try {
      const result = await adminService.listBookings({ page: pageIndex, size: 20 });
      setData(result);
      setPage(pageIndex);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(0);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Manage bookings</h1>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-gray-600">ID</th>
              <th className="px-3 py-2 text-left font-medium text-gray-600">User ID</th>
              <th className="px-3 py-2 text-left font-medium text-gray-600">Total</th>
              <th className="px-3 py-2 text-left font-medium text-gray-600">Status</th>
              <th className="px-3 py-2 text-left font-medium text-gray-600">Created</th>
            </tr>
          </thead>
          <tbody>
            {data.content && data.content.length > 0 ? (
              data.content.map((b) => (
                <tr key={b.id} className="border-t">
                  <td className="px-3 py-2">{b.id}</td>
                  <td className="px-3 py-2">{b.userId}</td>
                  <td className="px-3 py-2">{formatCurrency(b.totalPrice)}</td>
                  <td className="px-3 py-2">{b.status}</td>
                  <td className="px-3 py-2">{formatDate(b.createdAt)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-3 py-3 text-sm text-gray-500" colSpan={5}>
                  No bookings
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {data.totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: data.totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => load(idx)}
              className={`px-3 py-1 rounded border text-sm ${
                idx === page
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBookingsPage;

