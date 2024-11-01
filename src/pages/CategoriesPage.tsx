import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Car, Home, Zap, Wrench } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import RepairCard from '../components/RepairCard';

const categories = [
  { id: 'automotive', title: 'Automotive', icon: Car, color: 'bg-blue-500' },
  { id: 'home', title: 'Home', icon: Home, color: 'bg-green-500' },
  { id: 'electronics', title: 'Electronics', icon: Zap, color: 'bg-yellow-500' },
  { id: 'tools', title: 'Tools', icon: Wrench, color: 'bg-purple-500' },
];

const CategoriesPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  // Mock repairs data - In a real app, this would come from an API
  const repairs = [
    {
      id: 1,
      title: 'Change Car Oil',
      difficulty: 'Intermediate',
      time: '45 mins',
      image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=800',
      category: 'automotive',
    },
    // Add more mock repairs
  ];

  const filteredRepairs = category
    ? repairs.filter(repair => repair.category === category)
    : [];

  const selectedCategory = categories.find(c => c.id === category);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {!category ? (
        <>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Categories</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigate(`/categories/${cat.id}`)}
                className="cursor-pointer"
              >
                <CategoryCard {...cat} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="mb-8">
            <button
              onClick={() => navigate('/categories')}
              className="text-blue-600 hover:text-blue-700 mb-4"
            >
              ← All Categories
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              {selectedCategory?.title} Repairs
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredRepairs.map((repair) => (
              <RepairCard key={repair.id} {...repair} />
            ))}
          </div>

          {filteredRepairs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">
                No repairs found in this category
              </p>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default CategoriesPage;