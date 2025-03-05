import { useArticles } from "@/lib/microcms_api";
import Link from "next/link";
import type { Article } from "@/types/article";

export default function Home() {
  const { articles, error } = useArticles();
  if (error) return <p>エラーが発生しました</p>;
  if (!articles) return <p>読み込み中...</p>;

  return (
    <div className="flex">
      <main className="w-2/3 p-6">
        {articles.map((article: Article) => (
          <div key={article.id} className="mb-6 p-4 bg-white rounded-lg shadow-md">
            <Link href={`/articles/${article.id}`}>
              <h2 className="text-xl font-bold text-green-600">{article.title}</h2>
            </Link>
            <p className="text-gray-600">{article.publishedAt}</p>
          </div>
        ))}
      </main>

      <aside className="w-1/3 p-6 bg-gray-100">
        <h3 className="text-lg font-bold text-gray-700">カテゴリ</h3>
        {/* カテゴリリスト（仮） */}
        <ul>
          <li><Link href="#">Vue</Link></li>
          <li><Link href="#">Next.js</Link></li>
          <li><Link href="#">AWS</Link></li>
        </ul>
      </aside>
    </div>
  );
}
