import { GetStaticProps } from 'next';
import { fetchArticles, fetchTags, fetchCategories } from '@/libs/microcms_api';
import type { Article } from '@/type/Article';
import type { Tag } from '@/type/Tag';
import type { Category } from '@/type/Category';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import FeaturedArticle from '@/components/ui/FeaturedArticle';
import CategoryCard from '@/components/ui/CategoryCard';
import Sidebar from '@/components/ui/Sidebar';

// カテゴリー定義マッピング（microCMSのカテゴリー名とUIの表示名を紐付け）
const CATEGORY_CONFIG = {
  'backend-dev': {
    displayName: 'BACK-END',
    subcategory: 'Node.js + Prisma',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  'cloud-infra': {
    displayName: 'CLOUD & INFRA',
    subcategory: 'Terraform & IaC',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0l-11 6v12.131l11 5.869 11-5.869v-12.131l-11-6zm7.91 6.646l-7.905 4.218-7.872-4.294 7.862-4.289 7.915 4.365zm-16.91 1.584l8 4.363v8.607l-8-4.268v-8.702zm10 12.97v-8.6l8-4.269v8.6l-8 4.269z" />
      </svg>
    ),
  },
  'scrum-agile': {
    displayName: 'SCRUM & TEAM DEV',
    subcategory: 'Agile improvements',
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  'mobile-dev': {
    displayName: 'MOBILE DEV',
    subcategory: 'Flutter Cross-platform',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z" />
      </svg>
    ),
  },
};

interface HomeProps {
  featuredArticle: Article | null;
  categorizedArticles: {
    [key: string]: Article[];
  };
  recentArticles: Article[];
  allTags: string[];
}

export default function Home({
  featuredArticle,
  categorizedArticles,
  recentArticles,
  allTags,
}: HomeProps) {
  return (
    <DefaultLayout>
      {() => (
        <div className="min-h-screen">
          <main className="max-w-[1400px] mx-auto px-6 py-8">
            {/* Featured Article */}
            <section className="mb-12">
              {featuredArticle && <FeaturedArticle article={featuredArticle} />}
            </section>

            {/* メインコンテンツとサイドバー */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* メインコンテンツ (2/3) */}
              <div className="lg:col-span-2 space-y-8">
                {/* カテゴリーカードグリッド */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(CATEGORY_CONFIG).map(
                    ([categoryId, config]) => {
                      const articles = categorizedArticles[categoryId] || [];
                      // 記事がない場合はカードを表示しない
                      if (articles.length === 0) return null;

                      return (
                        <CategoryCard
                          key={categoryId}
                          category={config.displayName}
                          subcategory={config.subcategory}
                          articles={articles}
                          icon={config.icon}
                        />
                      );
                    }
                  )}
                </div>
              </div>

              {/* サイドバー (1/3) */}
              <div className="lg:col-span-1">
                <Sidebar articles={recentArticles} tags={allTags} />
              </div>
            </div>
          </main>
        </div>
      )}
    </DefaultLayout>
  );
}

// SSG/ISRでビルド時にデータフェッチ
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    // 1回のAPIコールで全データを取得（リクエスト数を最小化）
    const [articlesData, tagsData, categoriesData] = await Promise.all([
      fetchArticles({ limit: 50 }), // 最新50件を取得
      fetchTags(),
      fetchCategories(),
    ]);

    const articles = articlesData.contents;
    const tags = tagsData.contents;

    // Featured記事：最新1件
    const featuredArticle = articles.length > 0 ? articles[0] : null;

    // カテゴリー別に記事を振り分け（Next.js側でフィルタリング）
    const categorizedArticles: { [key: string]: Article[] } = {};

    Object.keys(CATEGORY_CONFIG).forEach((categoryId) => {
      // 各カテゴリーの最新3件を取得
      categorizedArticles[categoryId] = articles
        .filter(
          (article: Article) =>
            article.category &&
            (article.category.id === categoryId ||
              article.category.name === categoryId)
        )
        .slice(0, 3);
    });

    // サイドバー用の新着記事（Featured以外の最新10件）
    const recentArticles = articles.slice(1, 11);

    // タグ名の配列を作成
    const allTags = tags.map((tag: Tag) => tag.name);

    return {
      props: {
        featuredArticle,
        categorizedArticles,
        recentArticles,
        allTags,
      },
      revalidate: 60, // ISR: 60秒ごとに再生成（Netlifyの場合は On-Demand ISR を推奨）
    };
  } catch (error) {
    console.error('Failed to fetch data:', error);

    // エラー時はデフォルト値を返す
    return {
      props: {
        featuredArticle: null,
        categorizedArticles: {},
        recentArticles: [],
        allTags: [],
      },
      revalidate: 60,
    };
  }
};
