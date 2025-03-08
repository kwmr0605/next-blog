import { useArticles } from "@/libs/microcms_api";
import Link from "next/link";
import type { Article } from "@/types/Article";
import { formatDate } from "@/libs/fotmat_date";

export default function Home() {
  const { articles, error } = useArticles();
  if (error) return <p>エラーが発生しました</p>;
  if (!articles) return <p>読み込み中...</p>;

  return (
    <div className="max-w-[1200px] mx-auto">
      <main className="p-6">
        {articles.map((article: Article) => (
          <div
            key={article.id}
            className="mb-6 p-4 bg-white rounded-lg shadow-md"
          >
            <Link href={`/articles/${article.id}`}>
              <h2 className="text-xl font-bold">{article.title}</h2>
            </Link>
            <p className="text-gray-600">{formatDate(article.publishedAt)}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
