import { useState, useEffect } from 'react';
import { useArticles, useTags } from '@/libs/microcms_api';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import ArticleItems from '@/components/ui/ArticleItems';
import { Article } from '../../type/Article';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';

export default function ArticleList() {
  const router = useRouter();
  const { keyword, category, tag } = router.query;
  const { articles, error: articlesError } = useArticles();
  const { tags, error: tagsError } = useTags();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const articlesPerPage = 5;

  useEffect(() => {
    if (keyword) {
      setSearchQuery(keyword as string);
    }
    if (category) {
      setSelectedCategory(category as string);
    }
    if (tag) {
      setSelectedTag(tag as string);
    }
    // フィルター変更時にページを1に戻す
    setCurrentPage(1);
  }, [keyword, category, tag]);

  if (articlesError || tagsError) return <p>エラーが発生しました</p>;
  if (!articles || !tags) return <Loading />;

  const handleSearch = () => {
    const query: Record<string, string> = {};
    if (searchQuery) query.keyword = searchQuery;
    if (selectedCategory) query.category = selectedCategory;
    if (selectedTag) query.tag = selectedTag;

    router.push({
      pathname: '/articles',
      query,
    });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedTag('');
    router.push('/articles');
  };

  const filteredArticles = articles.filter((article: Article) => {
    // キーワード検索
    const matchesKeyword = keyword
      ? article.title.toLowerCase().includes((keyword as string).toLowerCase())
      : true;

    // カテゴリーフィルター
    const matchesCategory = category ? article.category?.id === category : true;

    // タグフィルター
    const matchesTag = tag ? article.tags?.some((t) => t.id === tag) : true;

    return matchesKeyword && matchesCategory && matchesTag;
  });

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

          {/* 検索・フィルター */}
          <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 shadow-glass relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accentColor/5 rounded-full blur-3xl"></div>

            <div className="relative">
              {/* タイトル */}
              <div className="flex items-center gap-3 mb-6">
                <svg
                  className="w-6 h-6 text-accentColor"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <h2 className="text-lg font-bold text-subColor">記事を探す</h2>
              </div>

              {/* フィルターグリッド */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* キーワード検索 */}
                <div>
                  <label className="flex items-center gap-2 text-subColor text-xs font-medium mb-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                    KEYWORD
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="記事タイトルで検索..."
                      className="w-full px-4 py-2.5 bg-glassBg backdrop-blur-glass border border-subColor/30 rounded-lg focus:outline-none focus:border-accentColor text-fontColor placeholder-subColor/50 transition"
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                </div>

                {/* カテゴリーフィルター */}
                <div>
                  <label className="flex items-center gap-2 text-subColor text-xs font-medium mb-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    CATEGORY
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full appearance-none px-4 py-2.5 bg-glassBg backdrop-blur-glass border border-subColor/30 rounded-lg focus:outline-none focus:border-accentColor text-fontColor transition cursor-pointer"
                    >
                      <option value="">すべてのカテゴリー</option>
                      {Array.from<string>(
                        new Set(
                          articles
                            .filter((a: Article) => a.category)
                            .map((a: Article) => JSON.stringify(a.category))
                        )
                      )
                        .map((c) => JSON.parse(c))
                        .map((cat: { id: string; name: string }) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                    </select>
                    <svg
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-subColor pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* タグフィルター */}
                <div>
                  <label className="flex items-center gap-2 text-subColor text-xs font-medium mb-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                      />
                    </svg>
                    TAG
                  </label>
                  <div className="relative">
                    <select
                      value={selectedTag}
                      onChange={(e) => setSelectedTag(e.target.value)}
                      className="w-full appearance-none px-4 py-2.5 bg-glassBg backdrop-blur-glass border border-subColor/30 rounded-lg focus:outline-none focus:border-accentColor text-fontColor transition cursor-pointer"
                    >
                      <option value="">すべてのタグ</option>
                      {tags.map((tag: { id: string; name: string }) => (
                        <option key={tag.id} value={tag.id}>
                          {tag.name}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-subColor pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* アクションボタン */}
              <div className="flex gap-3">
                <button
                  onClick={handleSearch}
                  className="flex-1 px-6 py-2.5 bg-accentColor/80 hover:bg-accentColor text-subColor font-medium rounded-lg transition-all hover:shadow-neon"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    検索
                  </span>
                </button>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-2.5 glass-card rounded-lg text-fontColor font-medium transition-all hover:text-accentColor hover:border-accentColor/40 border border-subColor/30"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    リセット
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* 検索結果表示 */}
          {(keyword || category || tag) && (
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="text-fontSecondary text-sm">
                検索結果: {filteredArticles.length}件
              </span>
              {keyword && (
                <span className="px-3 py-1 bg-accentColor/20 border border-accentColor/40 rounded-full text-xs text-fontColor">
                  キーワード: {keyword}
                </span>
              )}
              {category && (
                <span className="px-3 py-1 bg-accentColor/20 border border-accentColor/40 rounded-full text-xs text-fontColor">
                  カテゴリー:{' '}
                  {
                    articles.find((a: Article) => a.category?.id === category)
                      ?.category?.name
                  }
                </span>
              )}
              {tag && (
                <span className="px-3 py-1 bg-accentColor/20 border border-accentColor/40 rounded-full text-xs text-fontColor">
                  タグ: {tags.find((t: { id: string }) => t.id === tag)?.name}
                </span>
              )}
            </div>
          )}

          {/* 記事一覧 */}
          {filteredArticles.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center shadow-glass">
              <p className="text-fontSecondary text-lg mb-2">
                記事が見つかりませんでした
              </p>
              <p className="text-fontSecondary text-sm">
                別の検索条件をお試しください
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <ArticleItems
                articles={currentArticles}
                setHoveredArticle={setHoveredArticle}
              />
            </div>
          )}

          {/* ページネーション */}
          {filteredArticles.length > 0 && totalPages > 1 && (
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
          )}
        </div>
      )}
    </DefaultLayout>
  );
}
