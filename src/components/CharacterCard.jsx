import { useState } from 'react';

const CharacterCard = ({ character, onAddFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    onAddFavorite(character);
  };

  return (
    <div className="border p-4 m-2">
      <img src={character.image} alt={character.name} className="w-32 h-32 rounded-full mx-auto" />
      <h3 className="text-xl text-center">{character.name}</h3>
      <p className="text-center">{character.species}</p>
      <button
        onClick={handleFavoriteClick}
        className={`mt-2 p-2 ${isFavorite ? 'bg-red-500' : 'bg-gray-500'} text-white`}
      >
        {isFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
      </button>
    </div>
  );
};

export default CharacterCard;
