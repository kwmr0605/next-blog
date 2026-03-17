import Link from 'next/link';

const Footer = () => {
  const categories = [
    { name: 'FRONT-END', href: '/articles?category=frontend' },
    { name: 'BACK-END', href: '/articles?category=backend' },
    { name: 'CLOUD', href: '/articles?category=cloud' },
    { name: 'DevOps', href: '/articles?category=devops' },
  ];

  const subCategories = [
    { name: '開発カテゴリー', href: '/articles?cat=dev' },
    { name: '文字モカテゴリー', href: '/articles?cat=text' },
    { name: '数学分析', href: '/articles?cat=math' },
    { name: 'Stockカテゴリー', href: '/articles?cat=stock' },
  ];

  const techStack = [
    { name: 'NodeApt', href: '/tags/nodeapt' },
    { name: 'CLOUD', href: '/tags/cloud' },
    { name: 'Webサーブ', href: '/tags/web' },
  ];

  return (
    <footer className="bg-glassBg backdrop-blur-glass-strong border-t border-subColor/20 mt-20 shadow-glass">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                  {categories.map((cat) => (
                    <li key={cat.name}>
                      <Link
                        href={cat.href}
                        className="text-fontColor hover:text-accentColor transition text-sm hover:drop-shadow-[0_0_8px_rgba(82,190,198,0.5)]"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-3">
                <h4 className="text-fontSecondary text-sm mb-2">
                  子孫カテゴリー
                </h4>
                <ul className="space-y-2">
                  {subCategories.map((cat) => (
                    <li key={cat.name}>
                      <Link
                        href={cat.href}
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

          {/* FRONT-END */}
          <div className="relative">
            <h3 className="text-subColor font-bold mb-4 drop-shadow-md">
              FRONT-END
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/articles?cat=frontend-dev"
                  className="text-fontColor hover:text-accentColor transition text-sm hover:drop-shadow-[0_0_8px_rgba(82,190,198,0.5)]"
                >
                  開発カテゴリー
                </Link>
              </li>
              <li>
                <Link
                  href="/articles?cat=frontend-text"
                  className="text-fontColor hover:text-accentColor transition text-sm hover:drop-shadow-[0_0_8px_rgba(82,190,198,0.5)]"
                >
                  文字モカテゴリー
                </Link>
              </li>
              <li>
                <Link
                  href="/articles?cat=frontend-math"
                  className="text-fontColor hover:text-accentColor transition text-sm hover:drop-shadow-[0_0_8px_rgba(82,190,198,0.5)]"
                >
                  数学分析
                </Link>
              </li>
              <li>
                <Link
                  href="/articles?cat=frontend-stock"
                  className="text-fontColor hover:text-accentColor transition text-sm hover:drop-shadow-[0_0_8px_rgba(82,190,198,0.5)]"
                >
                  Stockカテゴリー
                </Link>
              </li>
            </ul>
            <div className="pt-3">
              {techStack.map((tech) => (
                <Link
                  key={tech.name}
                  href={tech.href}
                  className="text-fontColor hover:text-accentColor transition text-sm block mb-2 hover:drop-shadow-[0_0_8px_rgba(82,190,198,0.5)]"
                >
                  {tech.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Must-Read Classics */}
          <div className="relative">
            <h3 className="text-subColor font-bold mb-4 drop-shadow-md">
              Must-Read Classics
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-accentColor/30 to-accentColor/10 rounded backdrop-blur-sm border border-subColor/20"></div>
                <div className="flex-1">
                  <Link
                    href="/articles/featured-1"
                    className="text-fontColor hover:text-accentColor transition text-sm block mb-1 hover:drop-shadow-[0_0_8px_rgba(82,190,198,0.5)]"
                  >
                    AWS Fargate + NestJS でマイクロサービスを構築構築した話
                  </Link>
                  <p className="text-fontSecondary text-xs">2023/02/20</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tag Cloud & Social */}
          <div className="relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-accentColor/5 rounded-full blur-3xl"></div>
            <h3 className="text-subColor font-bold mb-4 drop-shadow-md relative">
              Tag Cloud
            </h3>
            <div className="flex flex-wrap gap-2 mb-6 relative">
              <p className="text-fontSecondary text-xs">タグを読み込み中...</p>
            </div>
            <h3 className="text-subColor font-bold mb-4 drop-shadow-md relative">
              Social Links
            </h3>
            <div className="flex gap-4 relative">
              <a
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
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
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
              </a>
              <a
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
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
            <div className="mt-6 relative">
              <h4 className="text-subColor font-bold text-sm mb-2">
                About the Lab
              </h4>
              <p className="text-fontSecondary text-xs">
                About the Lab is signified in community.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-subColor/20 mt-8 pt-6 text-center">
          <p className="text-fontSecondary text-sm">
            © 2026 五月雨ラボ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
