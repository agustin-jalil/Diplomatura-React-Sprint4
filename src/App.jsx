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
      if (!data || data.length === 0) {
        setCharacters([]);
        toast.warn('No se encontraron personajes.');
      } else {
        setCharacters(data);
        toast.success('Datos cargados con éxito');
      }
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
    toast.info(`${character.name} agregado a favoritos`);
  };

  const handleRemoveFavorite = (id) => {
    const newFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    toast.info('Personaje eliminado de favoritos');
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 app-container">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6">
        
        <div className="flex justify-center mb-4">
          <SearchForm onSearch={handleSearch} />
        </div>

        <div className="mt-6">
          {favorites.length === 0 ? (
            <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 tarjeta-de-alerta" role="alert">
              <p class="font-bold">No exiten favoritos</p>
              <p>Ingrese una letra o un nombre para ver el listado.</p>
            </div>
          ) : (
            <FavoriteList favorites={favorites} onRemoveFavorite={handleRemoveFavorite} />
          )}
        </div>

        {loading && (
          <div className="text-center text-xl text-blue-500">
            Cargando...
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center mt-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 characters-grid">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onAddFavorite={handleAddFavorite}
            />
          ))}
        </div>
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default App;
