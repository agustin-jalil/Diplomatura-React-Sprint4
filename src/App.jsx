import { useState, useEffect } from 'react';
import { fetchCharacters } from './api';
import SearchForm from './components/SearchForm';
import CharacterCard from './components/CharacterCard';
import FavoriteList from './components/FavoriteList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (query) => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchCharacters(query);
      setCharacters(data);
      toast.success('Datos cargados con éxito');
    } catch (err) {
      setError('No se pudieron obtener los personajes');
      toast.error('Error al obtener los personajes');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFavorite = (character) => {
    const newFavorites = [...favorites, character];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const handleRemoveFavorite = (id) => {
    const newFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <div className="container mx-auto p-4">
      <SearchForm onSearch={handleSearch} />
      {loading && <div className="text-center">Cargando...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-3 gap-4">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} onAddFavorite={handleAddFavorite} />
        ))}
      </div>
      <FavoriteList favorites={favorites} onRemoveFavorite={handleRemoveFavorite} />
      <ToastContainer />
    </div>
  );
};

export default App;
