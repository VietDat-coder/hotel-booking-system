const FilterSidebar = ({ filters, onChange }) => {
  const handleChange = (name, value) => {
    onChange({
      ...filters,
      [name]: value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Min price</label>
        <input
          type="number"
          value={filters.minPrice || ''}
          onChange={(e) => handleChange('minPrice', e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          placeholder="e.g. 50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Max price</label>
        <input
          type="number"
          value={filters.maxPrice || ''}
          onChange={(e) => handleChange('maxPrice', e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          placeholder="e.g. 200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Min rating</label>
        <input
          type="number"
          step="0.1"
          value={filters.rating || ''}
          onChange={(e) => handleChange('rating', e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          placeholder="e.g. 4"
        />
      </div>
    </div>
  );
};

export default FilterSidebar;

