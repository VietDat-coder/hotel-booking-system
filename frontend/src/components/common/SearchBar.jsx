const SearchBar = ({ value, onChange, onSubmit }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className="flex flex-col md:flex-row gap-3 bg-white p-4 rounded-lg shadow-sm"
    >
      <input
        type="text"
        placeholder="Search city..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;

