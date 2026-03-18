import Link from 'next/link';
import { useTags, useCategories } from '@/libs/microcms_api';

const Footer = () => {
  const { tags } = useTags();
  const { categories } = useCategories();

  return (
    <footer className="bg-glassBg backdrop-blur-glass-strong border-t border-subColor/20 mt-20 shadow-glass">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Site map */}
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-accentColor/5 rounded-full blur-3xl"></div>
            <h3 className="text-subColor font-bold mb-4 drop-shadow-md relative">
              Site map
            </h3>
            <div className="space-y-3 relative">
              <div>
                <h4 className="text-fontSecondary text-sm mb-2">カテゴリー</h4>
                <ul className="space-y-2">
                  {categories &&
                    categories.map((cat: { id: string; name: string }) => (
                      <li key={cat.id}>
                        <Link
                          href={`/articles?category=${cat.id}`}
                          className="text-fontColor hover:text-accentColor transition text-sm hover:drop-shadow-[0_0_8px_rgba(82,190,198,0.5)]"
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Trending Tags & Social */}
          <div className="relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-accentColor/5 rounded-full blur-3xl"></div>
            <h3 className="text-subColor font-bold mb-4 drop-shadow-md relative">
              Trending Tags
            </h3>
            <div className="flex flex-wrap gap-2 mb-6 relative">
              {tags &&
                tags.map((tag: { id: string; name: string }) => (
                  <Link
                    key={tag.id}
                    href={`/articles?tag=${tag.id}`}
                    className="px-3 py-1 bg-glassBg backdrop-blur-glass border border-subColor/30 rounded-full text-fontColor text-xs hover:bg-glassHover hover:border-accentColor/40 hover:shadow-neon transition"
                  >
                    #{tag.name}
                  </Link>
                ))}
            </div>
            <h3 className="text-subColor font-bold mb-4 drop-shadow-md relative">
              Social Links
            </h3>
            <div className="flex gap-4 relative">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fontColor hover:text-accentColor transition hover:drop-shadow-[0_0_15px_rgba(82,190,198,0.8)]"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fontColor hover:text-accentColor transition hover:drop-shadow-[0_0_15px_rgba(82,190,198,0.8)]"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fontColor hover:text-accentColor transition hover:drop-shadow-[0_0_15px_rgba(82,190,198,0.8)]"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* About the Lab */}
          <div className="relative">
            <h3 className="text-subColor font-bold mb-4 drop-shadow-md">
              About the Lab
            </h3>
            <p className="text-fontSecondary text-sm leading-relaxed">
              五月雨ラボは、最新のテクノロジーとベストプラクティスを探求し、共有するためのプラットフォームです。
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-subColor/20 text-center">
          <p className="text-fontSecondary text-sm">
            © 2026 五月雨ラボ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
