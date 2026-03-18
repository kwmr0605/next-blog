import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-glassBg backdrop-blur-glass-strong border-b border-subColor/20 fixed top-0 left-0 right-0 z-50 shadow-glass">
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center">
        {/* ロゴ */}
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-80 transition group"
        >
          <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-accentColor/30 shadow-neon group-hover:shadow-glass-hover transition-all bg-glassBg backdrop-blur-glass">
            <Image
              src="/images/icon.png"
              alt="五月雨ラボ"
              width={40}
              height={40}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <span className="text-xl font-bold text-subColor drop-shadow-lg">
            五月雨ラボ
          </span>
        </Link>

        {/* PC用メニュー */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-fontColor hover:text-accentColor transition hover:drop-shadow-[0_0_8px_rgba(82,190,198,0.5)]"
          >
            HOME
          </Link>
          <Link
            href="/articles"
            className="text-fontColor hover:text-accentColor transition hover:drop-shadow-[0_0_8px_rgba(82,190,198,0.5)]"
          >
            Articles
          </Link>
          <Link
            href="/about"
            className="text-fontColor hover:text-accentColor transition hover:drop-shadow-[0_0_8px_rgba(82,190,198,0.5)]"
          >
            About
          </Link>
        </nav>

        {/* ハンバーガーメニューボタン */}
        <button
          className="md:hidden p-2 text-subColor relative z-[60]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
        >
          <div
            className={`w-6 h-0.5 bg-subColor mb-1.5 transition-all shadow-[0_0_5px_rgba(82,190,198,0.5)] ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-subColor mb-1.5 transition-all shadow-[0_0_5px_rgba(82,190,198,0.5)] ${isMenuOpen ? 'opacity-0' : ''}`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-subColor transition-all shadow-[0_0_5px_rgba(82,190,198,0.5)] ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          ></div>
        </button>

        {/* オーバーレイ */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-baseColor/80 backdrop-blur-sm z-40 max-w-full"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}

        {/* スライドメニュー */}
        <div
          className={`fixed top-0 right-0 h-screen w-64 max-w-[80vw] bg-[rgba(115,139,147,0.95)] backdrop-blur-glass-strong border-l border-subColor/30 shadow-glass transform transition-transform duration-300 ease-in-out z-50 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="pt-20 px-6">
            <nav>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 text-fontColor hover:text-accentColor transition hover:drop-shadow-[0_0_8px_rgba(82,190,198,0.5)]"
                  >
                    HOME
                  </Link>
                </li>
                <li>
                  <Link
                    href="/articles"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 text-fontColor hover:text-accentColor transition hover:drop-shadow-[0_0_8px_rgba(82,190,198,0.5)]"
                  >
                    Articles
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 text-fontColor hover:text-accentColor transition hover:drop-shadow-[0_0_8px_rgba(82,190,198,0.5)]"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
