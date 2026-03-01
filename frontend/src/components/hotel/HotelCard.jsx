import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatUtils';

const HotelCard = ({ hotel }) => {
  const cheapestRoomPrice =
    hotel.rooms && hotel.rooms.length > 0
      ? Math.min(...hotel.rooms.map((r) => r.price || 0))
      : null;

  return (
    <Link
      to={`/hotels/${hotel.id}`}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
    >
      <div className="h-40 bg-gray-200">
        {hotel.thumbnail ? (
          <img
            src={hotel.thumbnail}
            alt={hotel.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg mb-1">{hotel.name}</h3>
        <p className="text-sm text-gray-500 mb-1">{hotel.city}</p>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{hotel.description}</p>
        <div className="mt-auto flex items-center justify-between text-sm">
          <span className="font-semibold text-primary-600">
            {cheapestRoomPrice != null ? formatCurrency(cheapestRoomPrice) + '/night' : 'No rooms'}
          </span>
          {hotel.rating && (
            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
              ★ {hotel.rating.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;

