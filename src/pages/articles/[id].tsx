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
  if (router.isFallback) return <p>読み込み中...</p>;

  return (
    <DefaultLayout>
      <div className="article-container max-w-[1200px] mx-auto px-6 py-12 mb-20">
        {/* タイトルセクション */}
        <div className="glass-card rounded-2xl p-4 md:p-8 mb-8 relative overflow-hidden shadow-glass">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-accentColor/10 rounded-full blur-3xl"></div>
          <h1 className="text-lg md:text-2xl font-bold text-center mb-4 text-subColor drop-shadow-lg relative break-words">
            {article.title}
          </h1>
          <div className="text-center relative">
            <p className="text-sm text-fontSecondary">
              {formatDate(article.publishedAt)}
            </p>
          </div>
          {article.category && (
            <div className="flex justify-center gap-2 mt-4 relative">
              <span className="px-4 py-1.5 bg-glassBg backdrop-blur-glass border border-subColor/30 rounded-full text-xs text-fontColor">
                {article.category}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-6">
          {/* 記事コンテンツ */}
          <article className="flex-1 max-w-5xl glass-card rounded-2xl p-4 md:p-8 shadow-glass relative overflow-hidden">
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accentColor/5 rounded-full blur-3xl"></div>
            <div
              dangerouslySetInnerHTML={{
                __html: addIdsToHeadings(article.content),
              }}
              className="prose prose-invert max-w-none relative break-words text-sm md:text-base
                prose-headings:text-subColor prose-headings:drop-shadow-md prose-headings:break-words
                prose-h1:text-lg md:prose-h1:text-2xl prose-h1:font-bold prose-h1:mb-3 md:prose-h1:mb-5
                prose-h2:text-base md:prose-h2:text-xl prose-h2:font-bold prose-h2:mb-2.5 md:prose-h2:mb-3 prose-h2:mt-5 md:prose-h2:mt-7
                prose-h3:text-sm md:prose-h3:text-lg prose-h3:font-bold prose-h3:mb-2 md:prose-h3:mb-2.5 prose-h3:mt-4 md:prose-h3:mt-5
                prose-p:text-fontColor prose-p:leading-relaxed prose-p:mb-2.5 md:prose-p:mb-3.5 prose-p:break-words prose-p:text-sm md:prose-p:text-base
                prose-a:text-accentColor prose-a:no-underline hover:prose-a:drop-shadow-[0_0_8px_rgba(82,190,198,0.5)] prose-a:break-all prose-a:text-sm md:prose-a:text-base
                prose-strong:text-subColor prose-strong:font-bold
                prose-ul:text-fontColor prose-ul:list-disc prose-ul:ml-3 md:prose-ul:ml-5 prose-ul:text-sm md:prose-ul:text-base
                prose-ol:text-fontColor prose-ol:list-decimal prose-ol:ml-3 md:prose-ol:ml-5 prose-ol:text-sm md:prose-ol:text-base
                prose-li:text-fontColor prose-li:mb-1 md:prose-li:mb-1.5 prose-li:text-sm md:prose-li:text-base
                prose-blockquote:border-l-4 prose-blockquote:border-accentColor prose-blockquote:pl-2.5 md:prose-blockquote:pl-3.5 prose-blockquote:italic prose-blockquote:text-fontSecondary prose-blockquote:text-sm md:prose-blockquote:text-base
                prose-img:rounded-xl prose-img:shadow-glass prose-img:border prose-img:border-subColor/20 prose-img:max-w-full"
            />
          </article>

          {/* サイドバー（目次） */}
          <aside
            className="w-[300px] hidden lg:block"
            style={{ position: 'sticky', top: '5rem', alignSelf: 'flex-start' }}
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
