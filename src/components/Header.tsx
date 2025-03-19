import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="h-20 md:h-10 md:mx-auto md:max-w-[1200px] md:px-4 mx-4 md:leading-10 flex justify-between items-center relative">
      <div className="flex-1">
        <Link href="/">
          <p className="font-bold">五月雨ラボ</p>
        </Link>
      </div>

      {/* PC用メニュー */}
      <nav className="hidden md:block">
        <ul className="flex gap-8">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/articles">Articles</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>

      {/* ハンバーガーメニューボタン */}
      <button
        className="md:hidden p-4 bg-accentColor rounded-full shadow-lg hover:bg-opacity-90 transition-all z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{
          clipPath:
            'polygon(50% 0%, 90% 20%, 100% 60%, 90% 80%, 50% 100%, 10% 80%, 0% 60%, 10% 20%)',
        }}
      >
        <div
          className={`w-5 h-0.5 bg-white mb-1.5 transition-all ${
            isMenuOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        ></div>
        <div
          className={`w-5 h-0.5 bg-white mb-1.5 transition-all ${
            isMenuOpen ? 'opacity-0' : ''
          }`}
        ></div>
        <div
          className={`w-5 h-0.5 bg-white transition-all ${
            isMenuOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        ></div>
      </button>

      {/* スライドメニュー */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out z-40 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="pt-16 px-4">
          <nav>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="block py-2 hover:text-accentColor">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="block py-2 hover:text-accentColor"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block py-2 hover:text-accentColor"
                >
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
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;
