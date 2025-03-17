import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import type { Article } from "@/types/Article";
import { fetchArticles, fetchArticleById } from "@/libs/microcms_api";
import { renderToc } from "@/libs/render_toc";
import { TableOfContents } from "@/components/TableOfContent";
import { parse } from "node-html-parser";
import { formatDate } from "@/libs/fotmat_date";
import { TocItem } from "@/types/TocItem";
import DefaultLayout from "@/components/layouts/ArticleLayout";

// 見出しのid要素に見出しテキストを指定
function addIdsToHeadings(html: string): string {
  const root = parse(html);
  root.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((heading) => {
    const text = heading.text.trim();
    heading.setAttribute("id", text);
  });
  return root.toString();
}

export default function ArticleDetail({
  article,
  toc,
}: {
  article: Article;
  toc: TocItem[];
}) {
  const router = useRouter();
  if (router.isFallback) return <p>読み込み中...</p>;

  return (
    <DefaultLayout>
      <div className="article-container max-w-[1200px] mx-auto mb-20">
        <div className="my-10">
          <h1 className="text-3xl font-bold text-center mb-6">
            {article.title}
          </h1>
          <div className="text-center">
            <p className="text-sm">{formatDate(article.publishedAt)}</p>
          </div>
        </div>
        <div className="flex">
          <article className="flex-1 max-w-5xl p-6 bg-white rounded-sm">
            <div
              dangerouslySetInnerHTML={{
                __html: addIdsToHeadings(article.content),
              }}
              className="prose mt-4"
            />
          </article>
          <aside
            className="w-[300px] pl-4 hidden md:block"
            style={{ position: "sticky", top: "1rem" }}
          >
            <TableOfContents toc={toc} />
          </aside>
        </div>
      </div>
    </DefaultLayout>
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
  const toc = renderToc(article.content);
  return { props: { article, toc }, revalidate: 10 };
};
