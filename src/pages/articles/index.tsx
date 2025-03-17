import { useState } from "react";
import { useArticles } from "@/libs/microcms_api";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import ArticleItems from "@/components/ui/ArticleItems";
export default function ArticleList() {
  const { articles, error } = useArticles();
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  if (error) return <p>エラーが発生しました</p>;
  if (!articles) return <p>読み込み中...</p>;

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <DefaultLayout>
      {({ setHoveredArticle }) => (
        <div className="max-w-[1200px] mx-auto mb-20 px-4">
          <h1 className="text-center text-2xl font-bold my-10">記事一覧</h1>
          <div className="space-y-6">
            <ArticleItems
              articles={currentArticles}
              setHoveredArticle={setHoveredArticle}
            />
          </div>

          <div className="flex justify-center mt-10 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  className={`px-4 py-2 rounded-sm ${
                    currentPage === number
                      ? "bg-gray-800 text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {number}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}
