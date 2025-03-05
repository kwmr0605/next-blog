import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import type { Article } from "@/types/article";
import { fetchArticles, fetchArticleById } from "@/lib/microcms_api";

export default function ArticleDetail({ article }: { article: Article }) {
  const router = useRouter();
  if (router.isFallback) return <p>読み込み中...</p>;

  return (
    <article className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-green-600">{article.title}</h1>
      <p className="text-gray-500">{article.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{ __html: article.content }}
        className="prose mt-4"
      />
    </article>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetchArticles();
  const paths = data.contents.map((article: Article) => ({
    params: { id: article.id },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const article = await fetchArticleById(params?.id as string);

  return { props: { article }, revalidate: 10 };
};
