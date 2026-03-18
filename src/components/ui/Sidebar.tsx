import Link from 'next/link';
import { Article } from '@/type/Article';
import { Tag } from '@/type/Tag';

interface SidebarProps {
  articles: Article[];
  tags: Tag[];
}

const Sidebar = ({ articles, tags }: SidebarProps) => {
  return (
    <aside className="space-y-6">
      {/* Latest Update */}
      <div className="glass-card rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accentColor/10 rounded-full blur-2xl"></div>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-accentColor/20 backdrop-blur-sm border border-accentColor/40 flex items-center justify-center shadow-neon">
            <svg
              className="w-4 h-4 text-accentColor"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-subColor font-bold text-lg drop-shadow-md relative">
            Latest Updates
          </h3>
        </div>

        <ul className="space-y-3 relative">
          {articles.slice(0, 6).map((article, index) => (
            <li
              key={article.id}
              className="flex items-start gap-3 group pb-3 border-b border-subColor/10 last:border-0 last:pb-0"
            >
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-glassBg border border-accentColor/30 flex-shrink-0 mt-0.5">
                <span className="text-xs text-accentColor font-bold">
                  {index + 1}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/articles/${article.id}`}
                  className="text-fontColor text-sm hover:text-accentColor transition line-clamp-2 group-hover:drop-shadow-[0_0_8px_rgba(82,190,198,0.3)] block"
                >
                  {article.title}
                </Link>
                {article.category && (
                  <span className="text-xs text-fontSecondary mt-1 inline-block">
                    {article.category.name}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Trending Tags */}
      <div className="glass-card rounded-xl p-6 relative overflow-hidden">
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accentColor/10 rounded-full blur-2xl"></div>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-accentColor/20 backdrop-blur-sm border border-accentColor/40 flex items-center justify-center shadow-neon">
            <svg
              className="w-4 h-4 text-accentColor"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
          </div>
          <h3 className="text-subColor font-bold text-lg drop-shadow-md relative">
            Trending Tags
          </h3>
        </div>

        <div className="flex flex-wrap gap-2 relative">
          {tags.slice(0, 15).map((tag) => (
            <Link
              key={tag.id}
              href={`/articles?tag=${tag.id}`}
              className="px-3 py-1.5 rounded-full bg-glassBg backdrop-blur-glass border border-subColor/30 text-fontColor text-xs hover:bg-glassHover hover:text-accentColor hover:border-accentColor/50 transition-all hover:shadow-neon"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
