import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import hotelService from '../../services/hotelService';
import roomService from '../../services/roomService';
import { formatCurrency } from '../../utils/formatUtils';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const HotelDetailPage = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [hotelData, roomData] = await Promise.all([
          hotelService.getHotel(id),
          roomService.listRooms({ hotelId: id })
        ]);
        setHotel(hotelData);
        setRooms(roomData);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!hotel) return <div className="container-page">Hotel not found.</div>;

  return (
    <div className="container-page space-y-6">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="h-64 bg-gray-200">
          {hotel.thumbnail && (
            <img
              src={hotel.thumbnail}
              alt={hotel.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
        </div>
        <div className="p-6 space-y-2">
          <h1 className="text-2xl font-bold">{hotel.name}</h1>
          <p className="text-gray-500 text-sm">
            {hotel.city} • {hotel.address}
          </p>
          {hotel.rating && (
            <p className="text-sm text-green-700">
              ★ {hotel.rating.toFixed(1)} rating
            </p>
          )}
          <p className="mt-3 text-sm text-gray-700">{hotel.description}</p>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Available rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rooms.length === 0 ? (
            <p className="text-sm text-gray-500 col-span-full">No rooms available.</p>
          ) : (
            rooms.map((room) => (
              <div key={room.id} className="bg-white rounded-lg shadow-sm p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{room.roomType}</h3>
                  <span className="text-primary-600 font-semibold">
                    {formatCurrency(room.price)}/night
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Capacity: {room.capacity} guests • Quantity: {room.quantity}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2">{room.description}</p>
                <button
                  className="mt-2 self-start px-3 py-1.5 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700"
                  onClick={() => (window.location.href = `/rooms/${room.id}`)}
                >
                  View & book
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default HotelDetailPage;

