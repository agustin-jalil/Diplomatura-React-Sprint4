const FavoriteList = ({ favorites, onRemoveFavorite }) => {
    return (
      <div className="mt-4 lista-de-favoritos">
        <h2 className="text-2xl">Favoritos</h2>
        <ul>
          {favorites.map((character) => (
            <li key={character.id} className="flex justify-between items-center">
              <span>{character.name}</span>
              <button
                onClick={() => onRemoveFavorite(character.id)}
                className="text-red-500"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default FavoriteList;
  