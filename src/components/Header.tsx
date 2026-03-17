import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-glassBg backdrop-blur-glass-strong border-b border-subColor/20 sticky top-0 z-50 shadow-glass">
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center">
        {/* ロゴ */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition group">
          <div className="w-10 h-10 bg-gradient-to-br from-accentColor to-accentColor/60 rounded-lg flex items-center justify-center shadow-neon group-hover:shadow-glass-hover transition-all">
            <span className="text-subColor text-xl font-bold">五</span>
          </div>
          <span className="text-xl font-bold text-subColor drop-shadow-lg">五月雨ラボ</span>
        </Link>

        {/* PC用メニュー */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-fontColor hover:text-accentColor transition hover:drop-shadow-[0_0_8px_rgba(82,190,198,0.5)]">
            HOME
          </Link>
          <Link href="/articles" className="text-fontColor hover:text-accentColor transition hover:drop-shadow-[0_0_8px_rgba(82,190,198,0.5)]">
            FRONT-END
          </Link>
          <Link href="/articles" className="text-fontColor hover:text-accentColor transition hover:drop-shadow-[0_0_8px_rgba(82,190,198,0.5)]">
            BACK-END
          </Link>
          <Link href="/articles" className="text-fontColor hover:text-accentColor transition hover:drop-shadow-[0_0_8px_rgba(82,190,198,0.5)]">
            CLOUD
          </Link>
          <Link href="/about" className="text-fontColor hover:text-accentColor transition hover:drop-shadow-[0_0_8px_rgba(82,190,198,0.5)]">
            ABOUT
          </Link>
          <div className="ml-4">
            <input
              type="text"
              placeholder="Search for tech articles..."
              className="bg-glassBg backdrop-blur-glass border border-subColor/30 rounded-lg px-4 py-2 text-fontColor placeholder-fontSecondary focus:outline-none focus:border-accentColor focus:shadow-neon transition w-64"
            />
          </div>
        </nav>

        {/* ハンバーガーメニューボタン */}
        <button
          className="md:hidden p-2 text-subColor"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={`w-6 h-0.5 bg-subColor mb-1.5 transition-all shadow-[0_0_5px_rgba(82,190,198,0.5)] ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-subColor mb-1.5 transition-all shadow-[0_0_5px_rgba(82,190,198,0.5)] ${isMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-subColor transition-all shadow-[0_0_5px_rgba(82,190,198,0.5)] ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>

        {/* スライドメニュー */}
        <div
          className={`fixed top-0 right-0 h-screen w-64 bg-glassBg backdrop-blur-glass-strong border-l border-subColor/30 shadow-glass transform transition-transform duration-300 ease-in-out z-40 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="pt-20 px-6">
            <nav>
              <ul className="space-y-4">
                <li>
                  <Link href="/" className="block py-2 text-fontColor hover:text-accentColor transition hover:drop-shadow-[0_0_8px_rgba(82,190,198,0.5)]">
                    HOME
                  </Link>
                </li>
                <li>
                  <Link href="/articles" className="block py-2 text-fontColor hover:text-accentColor transition hover:drop-shadow-[0_0_8px_rgba(82,190,198,0.5)]">
                    Articles
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="block py-2 text-fontColor hover:text-accentColor transition hover:drop-shadow-[0_0_8px_rgba(82,190,198,0.5)]">
                    About
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* オーバーレイ */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-baseColor/60 backdrop-blur-sm z-30"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}
      </div>
    </header>
  );
};

export default Header;
