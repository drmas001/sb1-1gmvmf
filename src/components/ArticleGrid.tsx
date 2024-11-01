import React from 'react';
import ArticleCard from './ArticleCard';
import type { Article } from '../types/article';

interface ArticleGridProps {
  articles: Article[];
  loading?: boolean;
  error?: string | null;
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ articles, loading, error }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-lg h-80 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No articles found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleGrid;