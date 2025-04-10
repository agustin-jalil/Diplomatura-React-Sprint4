// Importa el hook useState de React para manejar el estado del componente
import { useState } from 'react';

// Componente CharacterCard que recibe un personaje y una función para agregar a favoritos
const CharacterCard = ({ character, onAddFavorite }) => {
  // Estado local para manejar si el personaje es favorito o no
  const [isFavorite, setIsFavorite] = useState(false);

  // Función que se ejecuta al hacer clic en el botón de favorito
  const handleFavoriteClick = () => {
    // Alterna el estado de 'isFavorite' entre true y false
    setIsFavorite(!isFavorite);
    // Llama a la función 'onAddFavorite' pasada como prop para agregar el personaje a los favoritos
    onAddFavorite(character);
  };

  return (
    // Contenedor principal de la tarjeta con borde y espacio
    <div className="p-4 m-2 personajes">
      {/* Muestra la imagen del personaje, con una clase para hacerlo redondeado y centrado */}
      <img src={character.image} alt={character.name} className=" mx-auto" />
      
      {/* Nombre del personaje, centrado y con estilo */}
      <h3 className="text-xl text-center">{character.name}</h3>
      
      {/* Especie del personaje, centrado y con estilo */}
      <p className="text-center">{character.species}</p>
      
      {/* Botón para agregar o quitar de favoritos */}
      <button
        // Asocia la función handleFavoriteClick al evento 'onClick' del botón
        onClick={handleFavoriteClick}
        
        // Establece las clases del botón según el estado de isFavorite
        // Si es favorito, el fondo es rojo, si no es favorito, el fondo es gris
        className={`mt-2 p-2 ${isFavorite ? 'bg-red-500' : 'bg-gray-500'} text-white`}
      >
        {/* Texto del botón que cambia según si el personaje es favorito o no */}
        {isFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
      </button>
    </div>
  );
};

// Exporta el componente para que pueda ser usado en otros archivos
export default CharacterCard;
