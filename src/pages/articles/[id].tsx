import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import type { Article } from '../../type/Article';
import { fetchArticles, fetchArticleById } from '@/libs/microcms_api';
import { renderToc } from '@/libs/render_toc';
import { TableOfContents } from '@/components/TableOfContent';
import { parse } from 'node-html-parser';
import { formatDate } from '@/libs/fotmat_date';
import { TocItem } from '../../type/TocItem';
import DefaultLayout from '@/components/layouts/ArticleLayout';
import Loading from '@/components/Loading';

// 見出しのid要素に見出しテキストを指定
function addIdsToHeadings(html: string): string {
  const root = parse(html);
  root.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
    const text = heading.text.trim();
    heading.setAttribute('id', text);
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
  if (router.isFallback) return <Loading />;

  return (
    <DefaultLayout>
      <div className="max-w-[1200px] mx-auto px-6 py-12 mb-20 overflow-visible">
        {/* タイトルセクション */}
        <div className="glass-card rounded-2xl p-6 md:p-10 mb-10 relative shadow-glass overflow-visible">
          <div
            className="absolute -top-20 -right-20 w-40 h-40 bg-accentColor/5 rounded-full blur-3xl pointer-events-none"
            style={{ zIndex: -1 }}
          ></div>
          <h1 className="text-xl md:text-3xl font-bold text-center mb-6 text-subColor drop-shadow-lg relative break-words leading-relaxed tracking-wide">
            {article.title}
          </h1>
          <div className="text-center relative">
            <p className="text-sm md:text-base text-fontSecondary">
              {formatDate(article.publishedAt)}
            </p>
          </div>
          {article.category && (
            <div className="flex justify-center gap-2 mt-5 relative">
              <span className="px-4 py-1.5 bg-glassBg backdrop-blur-glass border border-subColor/30 rounded-full text-sm text-fontColor">
                {article.category.name}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* 記事コンテンツ */}
          <article className="flex-1 glass-card rounded-2xl p-6 md:p-12 shadow-glass relative overflow-visible min-w-0">
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accentColor/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
            <div
              dangerouslySetInnerHTML={{
                __html: addIdsToHeadings(article.content),
              }}
              className="prose prose-invert max-w-none relative break-words
                prose-headings:text-subColor prose-headings:drop-shadow-md prose-headings:break-words prose-headings:tracking-wide
                prose-h1:text-xl md:prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6 md:prose-h1:mb-8 prose-h1:mt-0 prose-h1:leading-relaxed
                prose-h2:text-lg md:prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-5 md:prose-h2:mb-6 prose-h2:mt-10 md:prose-h2:mt-12 prose-h2:leading-relaxed
                prose-h3:text-base md:prose-h3:text-xl prose-h3:font-bold prose-h3:mb-4 md:prose-h3:mb-5 prose-h3:mt-8 md:prose-h3:mt-10 prose-h3:leading-relaxed
                prose-p:text-fontColor prose-p:leading-loose prose-p:mb-6 md:prose-p:mb-8 prose-p:break-words prose-p:text-base md:prose-p:text-lg prose-p:tracking-wide
                prose-a:text-accentColor prose-a:no-underline hover:prose-a:drop-shadow-[0_0_8px_rgba(82,190,198,0.5)] prose-a:break-all prose-a:text-base md:prose-a:text-lg
                prose-strong:text-subColor prose-strong:font-bold
                prose-ul:list-outside prose-ul:list-disc prose-ul:text-fontColor prose-ul:pl-8 prose-ul:text-base md:prose-ul:text-lg prose-ul:my-6 prose-ul:leading-loose
                prose-ol:list-outside prose-ol:list-decimal prose-ol:text-fontColor prose-ol:pl-8 prose-ol:text-base md:prose-ol:text-lg prose-ol:my-6 prose-ol:leading-loose
                prose-li:list-item prose-li:text-fontColor prose-li:mb-3 md:prose-li:mb-4 prose-li:text-base md:prose-li:text-lg prose-li:leading-loose
                prose-blockquote:border-l-4 prose-blockquote:border-accentColor prose-blockquote:pl-4 md:prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-fontSecondary prose-blockquote:text-base md:prose-blockquote:text-lg prose-blockquote:my-6 prose-blockquote:leading-loose
                prose-img:rounded-xl prose-img:shadow-glass prose-img:border prose-img:border-subColor/20 prose-img:max-w-full prose-img:my-8"
            />
          </article>

          {/* サイドバー（目次） */}
          <aside className="hidden lg:block lg:w-[300px] flex-shrink-0">
            <div className="sticky top-24">
              <TableOfContents toc={toc} />
            </div>
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
