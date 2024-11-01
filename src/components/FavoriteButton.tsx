import React from 'react';
import { Star } from 'lucide-react';
import useFavorites from '../hooks/useFavorites';

interface FavoriteButtonProps {
  articleId: number;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ articleId }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(articleId);

  return (
    <button
      onClick={() => toggleFavorite(articleId)}
      className={`p-2 rounded-full transition-colors ${
        favorite
          ? 'bg-yellow-100 text-yellow-500 hover:bg-yellow-200'
          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
      }`}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Star
        className={`h-5 w-5 ${favorite ? 'fill-current' : ''}`}
      />
    </button>
  );
};

export default FavoriteButton;