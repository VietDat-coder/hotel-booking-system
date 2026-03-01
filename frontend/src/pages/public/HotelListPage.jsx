import { useEffect, useState } from 'react';
import hotelService from '../../services/hotelService';
import HotelCard from '../../components/hotel/HotelCard';
import HotelCardSkeleton from '../../components/hotel/HotelCardSkeleton';
import SearchBar from '../../components/common/SearchBar';
import FilterSidebar from '../../components/common/FilterSidebar';

const HotelListPage = () => {
  const [city, setCity] = useState('');
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(0);
  const [data, setData] = useState({ content: [], totalPages: 0 });
  const [loading, setLoading] = useState(true);

  const loadHotels = async (pageIndex = 0) => {
    setLoading(true);
    try {
      const params = {
        city: city || undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
        rating: filters.rating || undefined,
        page: pageIndex,
        size: 9,
        sort: 'id,asc'
      };
      const result = await hotelService.listHotels(params);
      setData(result);
      setPage(pageIndex);
    } catch {
      // in production we would show toast
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHotels(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    loadHotels(0);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    loadHotels(0);
  };

  return (
    <div className="container-page grid grid-cols-1 md:grid-cols-[260px,minmax(0,1fr)] gap-6">
      <div className="space-y-4">
        <SearchBar value={city} onChange={setCity} onSubmit={handleSearch} />
        <FilterSidebar filters={filters} onChange={handleFilterChange} />
      </div>
      <div className="space-y-4">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, idx) => (
              <HotelCardSkeleton key={idx} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.content && data.content.length > 0 ? (
                data.content.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)
              ) : (
                <p className="text-sm text-gray-500 col-span-full">No hotels found.</p>
              )}
            </div>
            {data.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: data.totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => loadHotels(idx)}
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
          </>
        )}
      </div>
    </div>
  );
};

export default HotelListPage;

