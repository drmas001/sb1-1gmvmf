import React from 'react';
import RepairCard from '../components/RepairCard';
import useFavorites from '../hooks/useFavorites';

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  // Mock repairs data - In a real app, this would come from an API
  const repairs = [
    {
      id: 1,
      title: 'Change Car Oil',
      difficulty: 'Intermediate',
      time: '45 mins',
      image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=800',
    },
    // Add more mock repairs
  ];

  const favoriteRepairs = repairs.filter(repair => 
    favorites.includes(repair.id)
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Favorite Repairs</h1>

      {favoriteRepairs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {favoriteRepairs.map((repair) => (
            <RepairCard key={repair.id} {...repair} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">
            You haven't saved any repairs to your favorites yet
          </p>
        </div>
      )}
    </main>
  );
};

export default FavoritesPage;