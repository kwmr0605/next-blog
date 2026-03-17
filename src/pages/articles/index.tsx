import { useState, useEffect } from 'react';
import { useArticles } from '@/libs/microcms_api';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import ArticleItems from '@/components/ui/ArticleItems';
import { Article } from '../../type/Article';
import { useRouter } from 'next/router';

export default function ArticleList() {
  const router = useRouter();
  const { keyword } = router.query;
  const { articles, error } = useArticles();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const articlesPerPage = 5;

  useEffect(() => {
    if (keyword) {
      setSearchQuery(keyword as string);
    }
  }, [keyword]);

  if (error) return <p>エラーが発生しました</p>;
  if (!articles) return <p>読み込み中...</p>;

  const handleSearch = () => {
    router.push({
      pathname: '/articles',
      query: { keyword: searchQuery },
    });
  };

  const filteredArticles = keyword
    ? articles.filter((article: Article) =>
        article.title.toLowerCase().includes((keyword as string).toLowerCase())
      )
    : articles;

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <DefaultLayout>
      {({ setHoveredArticle }) => (
        <div className="max-w-[1200px] mx-auto mb-20 px-6 py-12">
          {/* タイトル */}
          <div className="glass-card rounded-2xl p-6 mb-8 shadow-glass relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accentColor/10 rounded-full blur-3xl"></div>
            <h1 className="text-center text-2xl font-bold text-subColor drop-shadow-lg relative">
              記事一覧
            </h1>
          </div>

          {/* 検索バー */}
          <div className="flex justify-center md:justify-end mb-8">
            <div className="flex glass-card rounded-lg overflow-hidden shadow-glass">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="キーワード検索..."
                className="px-4 py-2 bg-transparent border-none focus:outline-none text-fontColor placeholder-fontSecondary w-64"
              />
              <button
                onClick={handleSearch}
                className="px-6 py-2 bg-accentColor/80 hover:bg-accentColor text-subColor font-medium transition-all hover:shadow-neon backdrop-blur-sm"
              >
                検索
              </button>
            </div>
          </div>

          {/* 記事一覧 */}
          <div className="space-y-6">
            <ArticleItems
              articles={currentArticles}
              setHoveredArticle={setHoveredArticle}
            />
          </div>

          {/* ページネーション */}
          <div className="flex justify-center mt-10 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    currentPage === number
                      ? 'glass-card text-accentColor shadow-neon border-accentColor/40'
                      : 'glass-card text-fontColor hover:text-accentColor hover:shadow-glass-hover'
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
