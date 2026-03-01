import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import hotelService from '../../services/hotelService';
import HotelCard from '../../components/hotel/HotelCard';
import HotelCardSkeleton from '../../components/hotel/HotelCardSkeleton';

const HomePage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await hotelService.listHotels({ page: 0, size: 6 });
        setHotels(data.content || []);
      } catch {
        // ignore for home
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container-page space-y-8">
      <section className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Book your perfect stay with{' '}
            <span className="text-primary-600">HotelBooking</span>
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Search and book hotels, manage your bookings, and explore top destinations with a
            production-ready booking experience.
          </p>
          <div className="flex gap-3 mt-2">
            <Link
              to="/hotels"
              className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700"
            >
              Explore hotels
            </Link>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-3">
          <div className="h-32 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700" />
          <div className="h-32 rounded-lg bg-gray-200" />
          <div className="h-32 rounded-lg bg-gray-200" />
          <div className="h-32 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-600" />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Featured hotels</h2>
          <Link to="/hotels" className="text-sm text-primary-600 hover:underline">
            View all
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <HotelCardSkeleton key={idx} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;

