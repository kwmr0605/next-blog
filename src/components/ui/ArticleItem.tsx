import Link from 'next/link';
import { Article } from '../../type/Article';
import { formatDate } from '@/libs/fotmat_date';

type ArticleItemProps = {
  article: Article;
  setHoveredArticle: (article: Article | null) => void;
};

const ArticleItem = ({ article, setHoveredArticle }: ArticleItemProps) => {
  return (
    <div
      key={article.id}
      className="glass-card rounded-xl p-6 transition-all duration-300 hover:shadow-glass-hover group relative overflow-hidden"
      onMouseEnter={() => setHoveredArticle(article)}
      onMouseLeave={() => setHoveredArticle(null)}
    >
      {/* グロー効果 */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-accentColor/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <Link href={`/articles/${article.id}`} className="block relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-bold text-subColor group-hover:text-accentColor transition-colors mb-3 drop-shadow-md break-words">
              {article.title}
            </h3>

            {article.description && (
              <p className="text-fontSecondary text-sm mb-3 line-clamp-2">
                {article.description}
              </p>
            )}

            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-fontSecondary text-sm flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {formatDate(article.publishedAt)}
              </span>

              {article.category && (
                <span className="px-3 py-1 bg-glassBg backdrop-blur-glass border border-subColor/30 rounded-full text-xs text-fontColor">
                  {article.category.name}
                </span>
              )}

              {article.tags &&
                article.tags.slice(0, 3).map((tag) => (
                  <span key={tag.id} className="text-accentColor text-xs">
                    #{tag.name}
                  </span>
                ))}
            </div>
          </div>

          {/* サムネイル */}
          {article.thumbnail && (
            <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden shadow-glass border border-subColor/20">
              <img
                src={article.thumbnail.url}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          )}
        </div>

        {/* Read More矢印 */}
        <div className="flex items-center gap-2 text-accentColor text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Read more</span>
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </Link>
    </div>
  );
};

export default ArticleItem;
