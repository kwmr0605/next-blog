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
      rootMargin: '0px 0px -80% 0px', // 見出しが80%表示されたらアクティブに
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
    <div className="bg-white p-4 rounded-sm sticky top-4">
      <p className="font-bold text-lg mb-4">目次</p>
      <ul>
        {toc.map((data) => (
          <li
            key={data.id}
            className={`py-1 hover:opacity-70 cursor-pointer text-[12px] ${
              activeId === data.text ? 'bg-gray-200' : ''
            } ${data.name === 'h3' ? 'pl-4' : ''}`}
          >
            <a href={`#${data.text}`}>{data.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
