import { Tag } from './Tag';
import { Category } from './Category';

export type Article = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  category?: Category;
  tags?: Tag[];
  thumbnail?: {
    url: string;
  };
  description?: string;
};
