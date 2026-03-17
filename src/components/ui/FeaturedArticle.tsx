import Link from 'next/link';
import { Article } from '@/type/Article';

interface FeaturedArticleProps {
  article: Article;
}

const FeaturedArticle = ({ article }: FeaturedArticleProps) => {
  return (
    <Link href={`/articles/${article.id}`}>
      <div className="relative group glass-card rounded-2xl overflow-hidden p-8 h-full transition-all duration-300 hover:shadow-glass-hover">
        <div className="absolute inset-0 bg-gradient-to-br from-accentColor/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* グロー効果 */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-accentColor/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative z-10 flex flex-col md:flex-row gap-6 h-full">
          {/* サムネイル */}
          <div className="md:w-1/2 flex items-center justify-center">
            {article.thumbnail ? (
              <img
                src={article.thumbnail.url}
                alt={article.title}
                className="w-full h-64 object-cover rounded-xl shadow-glass border border-subColor/20"
              />
            ) : (
              <div className="w-full h-64 bg-gradient-to-br from-accentColor/30 to-accentColor/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-subColor/20 shadow-neon">
                <svg
                  className="w-20 h-20 text-subColor/40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* コンテンツ */}
          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-accentColor font-semibold uppercase drop-shadow-[0_0_10px_rgba(82,190,198,0.5)]">
                  FEATURED ARTICLE
                </span>
                {article.category && (
                  <span className="px-3 py-1 bg-glassBg backdrop-blur-glass border border-subColor/30 rounded-full text-xs text-fontColor">
                    {article.category.name}
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-bold text-subColor mb-4 group-hover:text-accentColor transition-colors drop-shadow-lg">
                {article.title}
              </h2>

              {article.description && (
                <p className="text-fontSecondary text-sm mb-4 line-clamp-3">
                  {article.description}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-fontSecondary text-xs">
                {new Date(article.publishedAt).toLocaleDateString('ja-JP')}
              </span>

              <div className="flex items-center gap-2 text-accentColor group-hover:gap-3 transition-all drop-shadow-[0_0_10px_rgba(82,190,198,0.5)]">
                <span className="text-sm font-medium">Read Full Article</span>
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedArticle;
