import { TocItem } from '../type/TocItem';
import { useState, useEffect } from 'react';
export const TableOfContents = ({ toc }: { toc: TocItem[] }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: '-100px 0px -66% 0px', // ヘッダー分を考慮
      threshold: 0.5,
    });

    toc.forEach((item) => {
      const element = document.getElementById(item.text);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      toc.forEach((item) => {
        const element = document.getElementById(item.text);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [toc]);

  return (
    <div className="glass-card rounded-xl p-6 shadow-glass relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-accentColor/5 rounded-full blur-2xl pointer-events-none -z-10"></div>
      <p className="font-bold text-lg mb-4 text-subColor drop-shadow-md relative flex items-center gap-2 shrink-0">
        <svg
          className="w-5 h-5 text-accentColor"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
        目次
      </p>
      <ul className="space-y-1 relative">
        {toc.map((data) => (
          <li
            key={data.id}
            className={`py-2 px-3 rounded-lg cursor-pointer text-sm transition-all ${
              activeId === data.text
                ? 'bg-glassHover border border-accentColor/40 text-accentColor shadow-neon'
                : 'text-fontColor hover:bg-glassHover hover:text-accentColor'
            } ${data.name === 'h3' ? 'pl-6 text-xs' : ''}`}
          >
            <a href={`#${data.text}`} className="block">
              {data.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
