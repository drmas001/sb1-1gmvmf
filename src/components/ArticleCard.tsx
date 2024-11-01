import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Article } from '../types/article';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const defaultImage = 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=800';

  return (
    <Link 
      to={`/article/${article.id}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-video relative">
        <img
          src={article.images?.[0] || defaultImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{article.title}</h3>
        {article.intro && (
          <p className="text-gray-600 mb-4 line-clamp-2">{article.intro}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{article.quality}</span>
          <span className="inline-flex items-center text-blue-600">
            Read more
            <ArrowRight className="ml-1 w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;