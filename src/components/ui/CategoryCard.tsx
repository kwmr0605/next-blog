import Link from 'next/link';
import { Article } from '@/type/Article';

interface CategoryCardProps {
  category: string;
  subcategory: string;
  articles: Article[];
  icon?: React.ReactNode;
}

const CategoryCard = ({
  category,
  subcategory,
  articles,
  icon,
}: CategoryCardProps) => {
  return (
    <div className="glass-card rounded-xl overflow-hidden transition-all duration-300 group hover:shadow-glass-hover">
      {/* グロー効果 */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-accentColor/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* ヘッダー */}
      <div className="p-6 border-b border-subColor/20 relative">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-xs text-fontSecondary uppercase mb-1">
              {category}
            </p>
            <h3 className="text-lg font-bold text-subColor group-hover:text-accentColor transition-colors drop-shadow-md">
              {subcategory}
            </h3>
          </div>
          {icon && (
            <div className="text-accentColor opacity-60 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_10px_rgba(82,190,198,0.3)]">
              {icon}
            </div>
          )}
        </div>
      </div>

      {/* 記事リスト */}
      <div className="p-6 relative">
        <p className="text-fontSecondary text-sm mb-4 line-clamp-2">
          {articles[0]?.description ||
            articles[0]?.content.substring(0, 100) ||
            '記事を探索してテクノロジーの最新トピックを学びましょう'}
        </p>

        <div className="space-y-3">
          {articles.slice(0, 3).map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.id}`}
              className="flex items-start gap-3 text-sm text-fontColor hover:text-accentColor transition-colors group/item"
            >
              <svg
                className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover/item:drop-shadow-[0_0_5px_rgba(82,190,198,0.5)]"
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
              <span className="line-clamp-2">{article.title}</span>
            </Link>
          ))}
        </div>

        {/* アイコン表示 */}
        <div className="flex items-center gap-3 mt-6">
          {category === 'BACK-END' && (
            <>
              <div className="w-8 h-8 rounded-full bg-glassBg backdrop-blur-glass border border-subColor/30 flex items-center justify-center hover:shadow-neon transition-shadow">
                <svg
                  className="w-4 h-4 text-accentColor"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <div className="w-8 h-8 rounded-full bg-glassBg backdrop-blur-glass border border-subColor/30 flex items-center justify-center hover:shadow-neon transition-shadow">
                <svg
                  className="w-4 h-4 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <div className="w-8 h-8 rounded-full bg-glassBg backdrop-blur-glass border border-subColor/30 flex items-center justify-center hover:shadow-neon transition-shadow">
                <svg
                  className="w-4 h-4 text-subColor"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </div>
            </>
          )}
        </div>

        {/* Read More */}
        <Link
          href={`/articles?category=${category.toLowerCase()}`}
          className="flex items-center gap-2 text-accentColor hover:gap-3 transition-all mt-6 text-sm font-medium group/link drop-shadow-[0_0_8px_rgba(82,190,198,0.3)]"
        >
          <span>Read More</span>
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
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
