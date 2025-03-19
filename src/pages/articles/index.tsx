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
        <div className="max-w-[1200px] mx-auto mb-20 px-4">
          <h1 className="text-center text-2xl font-bold my-10">記事一覧</h1>

          <div className="flex justify-end mb-8">
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="キーワード"
                className="px-4 py-2 border border-r-0 border-accentColor rounded-l-sm focus:outline-none"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 text-white rounded-r-sm bg-accentColor w-20 border border-accentColor"
              >
                検索
              </button>
            </div>
          </div>

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
                      ? 'bg-accentColor text-white'
                      : 'bg-white text-accentColor'
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
