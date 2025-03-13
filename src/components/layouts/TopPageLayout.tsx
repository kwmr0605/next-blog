import { ReactNode, useState } from "react";
import Footer from "../Footer";
import type { Article } from "@/types/Article";
import { formatDate } from "@/libs/fotmat_date";

type LayoutProps = {
  children: (props: {
    setHoveredArticle: (article: Article | null) => void;
  }) => ReactNode;
};

const TopPageLayout = ({ children }: LayoutProps) => {
  const [hoveredArticle, setHoveredArticle] = useState<Article | null>(null);
  const sanitizeContent = (content: string) => {
    return content.replace(/<[^>]+>/g, "");
  };

  return (
    <div>
      <div className="md:flex md:h-screen">
        {/* 左側エリア (背景画像) */}
        <div
          className="w-full h-[calc(100vh-100px)] md:w-1/2 md:h-screen bg-cover bg-right md:fixed md:left-0 md:top-0"
          style={{ backgroundImage: "url('/images/top_bg.jpg')" }}
        >
          {hoveredArticle && (
            <div
              className="mx-20 my-96 absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-lg text-white p-6 rounded-lg"
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
                      return cleanContent.length > 300
                        ? cleanContent.substring(0, 300) + "..."
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
          <div className="mx-4">{children({ setHoveredArticle })}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default TopPageLayout;
