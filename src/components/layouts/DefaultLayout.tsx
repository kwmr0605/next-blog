import { ReactNode, useState } from "react";
import Footer from "../Footer";
import type { Article } from "@/types/Article";
import { formatDate } from "@/libs/fotmat_date";
import { sanitizeContent } from "@/libs/sanitize_content";
import Link from "next/link";
import { useRouter } from "next/router";

type DefaultLayoutProps = {
  children:
    | ReactNode
    | ((props: {
        setHoveredArticle: (article: Article | null) => void;
      }) => ReactNode);
};

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const [hoveredArticle, setHoveredArticle] = useState<Article | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const getBgPositionClass = (pathname: string) => {
    switch (pathname) {
      case "/":
        return "bg-right";
      case "/about":
        return "bg-left";
      default:
        return "bg-center";
    }
  };

  return (
    <div>
      <div className="md:flex md:h-screen">
        {/* 左側エリア (背景画像) */}
        <div
          className={`w-full h-[calc(100vh-100px)] md:w-1/2 md:h-screen bg-cover ${getBgPositionClass(router.pathname)} md:fixed md:left-0 md:top-0 relative`}
          style={{ backgroundImage: "url('/images/top_bg.jpg')" }}
        >
          {/* ハンバーガーメニューボタン */}
          <button
            className="fixed top-4 right-4 md:absolute md:left-4 md:right-auto z-50 p-4 bg-accentColor rounded-full shadow-lg hover:bg-opacity-90 transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              clipPath:
                "polygon(50% 0%, 90% 20%, 100% 60%, 90% 80%, 50% 100%, 10% 80%, 0% 60%, 10% 20%)",
            }}
          >
            <div
              className={`w-5 h-0.5 bg-white mb-1.5 transition-all ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            ></div>
            <div
              className={`w-5 h-0.5 bg-white mb-1.5 transition-all ${isMenuOpen ? "opacity-0" : ""}`}
            ></div>
            <div
              className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            ></div>
          </button>

          {/* サイドメニュー */}
          <div
            className={`fixed top-0 right-0 md:left-0 h-screen w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out z-40 ${
              isMenuOpen
                ? "translate-x-0"
                : "translate-x-full md:-translate-x-full"
            }`}
          >
            <div className="pt-20 px-4">
              <nav>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/"
                      className="block py-2 hover:text-accentColor"
                    >
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
                      About Me
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

          {hoveredArticle && (
            <div
              className="hidden md:flex mx-20 h-fit my-auto absolute inset-0 items-center justify-center bg-white/10 backdrop-blur-lg text-white px-6 py-14 rounded-lg"
              style={{
                transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                opacity: hoveredArticle ? 1 : 0,
                transform: hoveredArticle ? "scale(1)" : "scale(0.9)",
              }}
            >
              <div className="text-center text-white px-4">
                <h4 className="text-xl font-bold text-white mb-8">
                  {hoveredArticle.title}
                </h4>
                <p className="text-white mb-4">
                  {formatDate(hoveredArticle.publishedAt)}
                </p>
                <div className="mt-2 text-sm bg-none">
                  <p className="text-white">
                    {(() => {
                      const cleanContent = sanitizeContent(
                        hoveredArticle.content
                      );
                      return cleanContent.length > 240
                        ? cleanContent.substring(0, 240) + "..."
                        : cleanContent;
                    })()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 右側 (記事一覧エリア) */}
        <div className="w-full md:w-1/2 ml-auto md:overflow-y-auto h-screen">
          <div className="mx-4 flex flex-col min-h-screen">
            <div className="flex-grow">
              {typeof children === "function"
                ? children({ setHoveredArticle })
                : children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
