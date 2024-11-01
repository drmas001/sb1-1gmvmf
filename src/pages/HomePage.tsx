import React from 'react';
import { useWikiArticles } from '../hooks/useWikiArticles';
import ArticleCard from '../components/ArticleCard';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Wrench, Home, Car, Zap } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';

const categories = [
  { id: 'automotive', title: 'Automotive', icon: Car, color: 'bg-blue-500' },
  { id: 'home', title: 'Home', icon: Home, color: 'bg-green-500' },
  { id: 'electronics', title: 'Electronics', icon: Zap, color: 'bg-yellow-500' },
  { id: 'tools', title: 'Tools', icon: Wrench, color: 'bg-purple-500' },
];

function HomePage() {
  const { articles, loading, error } = useWikiArticles(3);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SearchBar />

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Popular Repairs</h2>
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {articles && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default HomePage;