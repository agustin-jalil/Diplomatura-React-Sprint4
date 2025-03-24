import { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2"
        placeholder="Buscar personajes"
      />
      <button type="submit" className="ml-2 p-2 bg-blue-500 text-white">Buscar</button>
    </form>
  );
};

export default SearchForm;
