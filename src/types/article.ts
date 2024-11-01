export interface Article {
  id: number;
  title: string;
  quality: string;
  intro?: string;
  images: string[];
}

export interface ArticleDetails extends Article {
  steps: Array<{
    number: number;
    title: string;
    description: string;
    images?: string[];
  }>;
  warnings?: string[];
}

export interface ArticlePreview {
  id: number;
  title: string;
  quality: string;
  intro?: string;
  image?: string;
}