import Link from 'next/link';
import { Article } from '@/types/Article';
import { formatDate } from '@/libs/fotmat_date';

type ArticleItemProps = {
  article: Article;
  setHoveredArticle: (article: Article | null) => void;
};

const ArticleItem = ({ article, setHoveredArticle }: ArticleItemProps) => {
  return (
    <div key={article.id} className="mb-6 p-4 bg-white rounded-lg">
      <Link
        href={`/articles/${article.id}`}
        onMouseEnter={() => setHoveredArticle(article)}
        onMouseLeave={() => setHoveredArticle(null)}
      >
        <p className="text-xl font-bold">{article.title}</p>
      </Link>
      <p className="text-gray-600">{formatDate(article.publishedAt)}</p>
    </div>
  );
};

export default ArticleItem;
