import { useArticles } from "@/libs/microcms_api";
import Link from "next/link";
import type { Article } from "@/types/Article";
import { formatDate } from "@/libs/fotmat_date";
import TopPageLayout from "@/components/layouts/TopPageLayout";

export default function Home() {
  const { articles, error } = useArticles();
  if (error) return <p>エラーが発生しました</p>;
  if (!articles) return <p>読み込み中...</p>;

  return (
    <TopPageLayout>
      {({ setHoveredArticle }) => (
        <div className="max-w-[1200px] mx-auto">
          <main>
            <div className="justify-between mb-10">
              <div className="text-center pt-10">
                <h1>五月雨ラボ</h1>
                <p>プログラミングの情報を発信するサイトです。</p>
                <p>
                  普段の業務で得た知識や、自分で学んだことを備忘録としてまとめます。
                </p>
              </div>
              <div className="text-center">
                <img
                  className="w-[360px] h-[360px] mix-blend-multiply md:w-[400px] md:h-[400px] mx-auto"
                  src="/images/top.jpeg"
                  alt="top"
                />
              </div>
            </div>
            <div className="mb-10">
              <h2>最新記事</h2>
              {articles.map((article: Article) => (
                <div key={article.id} className="mb-6 p-4 bg-white rounded-lg">
                  <Link
                    href={`/articles/${article.id}`}
                    onMouseEnter={() => setHoveredArticle(article)}
                    onMouseLeave={() => setHoveredArticle(null)}
                  >
                    <p className="text-xl font-bold">{article.title}</p>
                  </Link>
                  <p className="text-gray-600">
                    {formatDate(article.publishedAt)}
                  </p>
                </div>
              ))}
            </div>
          </main>
        </div>
      )}
    </TopPageLayout>
  );
}
