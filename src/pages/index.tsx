import { useArticles } from '@/libs/microcms_api';
import Link from 'next/link';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import ArticleItems from '@/components/ui/ArticleItems';
export default function Home() {
  const { articles, error } = useArticles();
  if (error) return <p>エラーが発生しました</p>;
  if (!articles) return <p>読み込み中...</p>;

  return (
    <DefaultLayout>
      {({ setHoveredArticle }) => (
        <div className="max-w-[1200px] mx-auto">
          <main>
            <div className="justify-between mb-10">
              <div className="text-center pt-10">
                {/* TODO: ロゴ用意できたら置換 */}
                <h1 className="mb-5">五月雨ラボ</h1>
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
              <div className="text-center mb-4">
                <h2 className="inline-block text-center border-b-2 px-4 border-accentColor">
                  最新記事
                </h2>
              </div>
              <ArticleItems
                articles={articles.slice(0, 10)}
                setHoveredArticle={setHoveredArticle}
              />
              <div className="text-right">
                <Link href="/articles">View More</Link>
              </div>
            </div>
          </main>
        </div>
      )}
    </DefaultLayout>
  );
}
