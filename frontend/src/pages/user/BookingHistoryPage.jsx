import { useEffect, useState } from 'react';
import bookingService from '../../services/bookingService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { formatCurrency, formatDate } from '../../utils/formatUtils';

const BookingHistoryPage = () => {
  const [data, setData] = useState({ content: [], totalPages: 0 });
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const load = async (pageIndex = 0) => {
    setLoading(true);
    try {
      const result = await bookingService.getMyBookings({ page: pageIndex, size: 10 });
      setData(result);
      setPage(pageIndex);
    } catch {
      // ignore for now
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(0);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container-page space-y-4">
      <h1 className="text-xl font-semibold">My bookings</h1>
      <div className="bg-white rounded-lg shadow-sm divide-y">
        {data.content && data.content.length > 0 ? (
          data.content.map((booking) => (
            <div key={booking.id} className="p-4 space-y-1 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium">#{booking.id}</span>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium ${
                    booking.status === 'CANCELLED'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {booking.status}
                </span>
              </div>
              <p>Total: {formatCurrency(booking.totalPrice)}</p>
              <p>Created at: {formatDate(booking.createdAt)}</p>
            </div>
          ))
        ) : (
          <p className="p-4 text-sm text-gray-500">No bookings yet.</p>
        )}
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

export default BookingHistoryPage;

