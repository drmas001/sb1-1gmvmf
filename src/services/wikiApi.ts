import axios from 'axios';
import type { Article, ArticleDetails } from '../types/article';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 15000,
});

export async function getRandomArticles(count: number = 3): Promise<Article[]> {
  try {
    const { data } = await api.get<Article[]>('/articles/random', {
      params: { count }
    });
    return data;
  } catch (error) {
    console.error('Error fetching random articles:', error);
    return [];
  }
}

export async function getArticleDetails(id: number): Promise<ArticleDetails | null> {
  try {
    const { data } = await api.get<ArticleDetails>(`/articles/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching article details:', error);
    return null;
  }
}

export async function searchArticles(query: string): Promise<Article[]> {
  try {
    const { data } = await api.get<Article[]>('/articles/search', {
      params: { q: query }
    });
    return data;
  } catch (error) {
    console.error('Error searching articles:', error);
    return [];
  }
}