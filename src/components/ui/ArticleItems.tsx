import { Article } from '@/types/Article';
import ArticleItem from './ArticleItem';

type ArticleItemsProps = {
  articles: Article[];
  setHoveredArticle: (article: Article | null) => void;
};

const ArticleItems = ({ articles, setHoveredArticle }: ArticleItemsProps) => {
  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <ArticleItem
          key={article.id}
          article={article}
          setHoveredArticle={setHoveredArticle}
        />
      ))}
    </div>
  );
};

export default ArticleItems;
