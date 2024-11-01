import React from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RepairCard from '../components/RepairCard';
import { useWikiArticles } from '../hooks/useWikiArticles';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { articles, loading, error } = useWikiArticles(query);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Search Results for "{query}"
        </h2>
        {articles && (
          <p className="text-gray-600 mt-2">
            Found {articles.length} results
          </p>
        )}
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message="Failed to load search results" />}

      {articles && articles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article: any) => (
            <RepairCard
              key={article.id}
              id={article.id}
              title={article.title}
              difficulty={article.quality || 'Intermediate'}
              time={`${Math.floor(Math.random() * 30 + 15)} mins`}
              image={article.images?.[0] || 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=800'}
            />
          ))}
        </div>
      )}

      {articles && articles.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-600">No results found for "{query}"</p>
        </div>
      )}
    </main>
  );
};

export default SearchPage;