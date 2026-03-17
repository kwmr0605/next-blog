export type Article = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  category?: string;
  tags?: string[];
  thumbnail?: {
    url: string;
  };
  description?: string;
};
