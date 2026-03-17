import Link from 'next/link';
import { Article } from '@/type/Article';

interface SidebarProps {
  articles: Article[];
  tags: string[];
}

const Sidebar = ({ articles, tags }: SidebarProps) => {
  return (
    <aside className="space-y-6">
      {/* Front-end Hot Topics */}
      <div className="glass-card rounded-xl p-6 transition-all duration-300 hover:shadow-glass-hover relative overflow-hidden">
        {/* グロー効果 */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-accentColor/10 rounded-full blur-2xl"></div>
        
        <div className="flex items-center gap-3 mb-4 relative">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accentColor/20 backdrop-blur-sm border border-accentColor/40 flex items-center justify-center shadow-neon">
              <svg className="w-4 h-4 text-accentColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="w-8 h-8 rounded-full bg-green-400/20 backdrop-blur-sm border border-green-400/40 flex items-center justify-center">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-400/20 backdrop-blur-sm border border-blue-400/40 flex items-center justify-center">
              <span className="text-blue-400 font-bold text-xs">TS</span>
            </div>
          </div>
        </div>
        
        <h3 className="text-subColor font-bold text-lg mb-4 drop-shadow-md">Front-end Hot Topics</h3>
        
        <div className="space-y-4 relative">
          {articles.slice(0, 2).map((article) => (
            <div key={article.id} className="pb-4 border-b border-subColor/10 last:border-0 last:pb-0">
              <div className="flex items-start gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-accentColor/20 backdrop-blur-sm border border-accentColor/40 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[0_0_8px_rgba(82,190,198,0.3)]">
                  <svg className="w-3 h-3 text-accentColor" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                </div>
                <Link href={`/articles/${article.id}`} className="text-subColor font-medium text-sm hover:text-accentColor transition drop-shadow-sm">
                  {article.title}
                </Link>
              </div>
              <ul className="space-y-1 ml-7 text-fontSecondary text-xs">
                <li className="flex items-start gap-2">
                  <span className="text-accentColor drop-shadow-[0_0_5px_rgba(82,190,198,0.5)]">•</span>
                  <span>Key points: {article.description?.substring(0, 50) || 'React 19の新機能'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accentColor drop-shadow-[0_0_5px_rgba(82,190,198,0.5)]">•</span>
                  <span>Key Points: React 19とReact 18の相違点</span>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="glass-card rounded-xl p-6 transition-all duration-300 hover:shadow-glass-hover relative overflow-hidden">
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accentColor/10 rounded-full blur-2xl"></div>
        
        <h3 className="text-subColor font-bold text-lg mb-4 drop-shadow-md relative">Tags</h3>
        <div className="space-y-2 relative">
          {tags.slice(0, 10).map((tag) => (
            <Link 
              key={tag} 
              href={`/articles?tag=${tag.toLowerCase()}`}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-glassHover transition group"
            >
              <span className="text-fontColor text-sm group-hover:text-accentColor transition group-hover:drop-shadow-[0_0_8px_rgba(82,190,198,0.5)]">
                #{tag}
              </span>
              <div className="w-6 h-6 rounded bg-accentColor/10 backdrop-blur-sm border border-accentColor/30 flex items-center justify-center group-hover:shadow-neon transition-shadow">
                <svg className="w-3 h-3 text-accentColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Latest Update */}
      <div className="glass-card rounded-xl p-6 transition-all duration-300 hover:shadow-glass-hover relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accentColor/10 rounded-full blur-2xl"></div>
        
        <h3 className="text-subColor font-bold text-lg mb-4 drop-shadow-md relative">Latest Update</h3>
        <ul className="space-y-3 relative">
          {articles.slice(0, 4).map((article) => (
            <li key={article.id} className="flex items-start gap-2 group">
              <div className="w-1.5 h-1.5 rounded-full bg-accentColor flex-shrink-0 mt-2 shadow-[0_0_6px_rgba(82,190,198,0.8)]"></div>
              <Link href={`/articles/${article.id}`} className="text-fontColor text-sm hover:text-accentColor transition line-clamp-2 group-hover:drop-shadow-[0_0_8px_rgba(82,190,198,0.3)]">
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
