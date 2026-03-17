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
          <div className="glass-card rounded-2xl p-6 mb-8 shadow-glass relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accentColor/10 rounded-full blur-3xl"></div>
            <div className="space-y-4 relative">
              {/* キーワード検索 */}
              <div>
                <label className="block text-fontColor text-sm font-medium mb-2">
                  キーワード検索
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="記事タイトルで検索..."
                    className="flex-1 px-4 py-2 bg-glassBg backdrop-blur-glass border border-subColor/30 rounded-lg focus:outline-none focus:border-accentColor text-fontColor placeholder-fontSecondary transition"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
              </div>

              {/* カテゴリーフィルター */}
              <div>
                <label className="block text-fontColor text-sm font-medium mb-2">
                  カテゴリー
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 bg-glassBg backdrop-blur-glass border border-subColor/30 rounded-lg focus:outline-none focus:border-accentColor text-fontColor transition"
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
              </div>

              {/* タグフィルター */}
              <div>
                <label className="block text-fontColor text-sm font-medium mb-2">
                  タグ
                </label>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full px-4 py-2 bg-glassBg backdrop-blur-glass border border-subColor/30 rounded-lg focus:outline-none focus:border-accentColor text-fontColor transition"
                >
                  <option value="">すべてのタグ</option>
                  {tags.map((tag: { id: string; name: string }) => (
                    <option key={tag.id} value={tag.id}>
                      {tag.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* ボタン */}
              <div className="flex gap-2">
                <button
                  onClick={handleSearch}
                  className="flex-1 px-6 py-2 bg-accentColor/80 hover:bg-accentColor text-subColor font-medium rounded-lg transition-all hover:shadow-neon"
                >
                  検索
                </button>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-2 glass-card text-fontColor hover:text-accentColor font-medium rounded-lg transition-all hover:shadow-glass-hover"
                >
                  クリア
                </button>
              </div>
            </div>
          </div>

          {/* 検索結果表示 */}
          {(keyword || category || tag) && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
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
