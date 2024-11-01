import { useState, useEffect } from 'react';
import type { Article, ArticleDetails } from '../types/article';
import { getRandomArticles, getArticleDetails, searchArticles } from '../services/wikiApi';

export function useWikiArticles(queryOrCount?: string | number) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let data: Article[];
        if (typeof queryOrCount === 'string' && queryOrCount.trim()) {
          data = await searchArticles(queryOrCount);
        } else {
          const count = typeof queryOrCount === 'number' ? queryOrCount : 3;
          data = await getRandomArticles(count);
        }
        
        setArticles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [queryOrCount]);

  return { articles, loading, error };
}

export function useWikiArticle(id: number) {
  const [article, setArticle] = useState<ArticleDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await getArticleDetails(id);
        setArticle(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  return { article, loading, error };
}