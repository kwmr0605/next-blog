# TOPページ データアーキテクチャ設計書

## 概要

このドキュメントは、五月雨ラボのTOPページにおけるデータフェッチ戦略とアーキテクチャについて説明します。

## 採用した設計: ハイブリッド型（1クエリ＋Next.js側で振り分け）+ SSG/ISR

### 設計の選定理由

#### 1. APIリクエスト数の最小化

- **ビルド時に1回のAPIコール**で全データを取得
- microCMSの従量課金を最小限に抑える
- Netlifyのビルド時間も短縮

#### 2. Netlify SSG/ISRとの相性

- `getStaticProps`で一度に全データを取得
- ISR（Incremental Static Regeneration）で定期的に更新
- CDNキャッシュの恩恵を最大限に受ける

#### 3. 柔軟性

- Next.js側でカテゴリーフィルタリング
- UIの変更がCMS側の設定に依存しない
- カテゴリー表示順の変更が容易

#### 4. パフォーマンス

- ビルド時にデータ取得するため、ユーザー体験が高速
- クライアントサイドでのAPI呼び出しなし
- 初期表示が即座に完了

#### 5. メンテナンス性

- シンプルで理解しやすい
- デバッグが容易
- 新しいカテゴリーの追加が簡単

## アーキテクチャ詳細

### データフロー

```
[microCMS API]
     ↓ (Build time - 1 API call)
[getStaticProps]
     ↓ (Filter & categorize)
[Next.js Page Component]
     ↓ (Props)
[UI Components]
```

### 実装の流れ

#### 1. ビルド時のデータ取得 (`getStaticProps`)

```typescript
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  // 並列で全データを取得（高速化）
  const [articlesData, tagsData, categoriesData] = await Promise.all([
    fetchArticles({ limit: 50 }), // 最新50件
    fetchTags(),
    fetchCategories(),
  ]);

  // ... データ加工処理

  return {
    props: { ... },
    revalidate: 60, // ISR: 60秒ごとに再生成
  };
};
```

#### 2. カテゴリー別振り分け

```typescript
// カテゴリー別に記事を振り分け
const categorizedArticles: { [key: string]: Article[] } = {};

Object.keys(CATEGORY_CONFIG).forEach((categoryId) => {
  categorizedArticles[categoryId] = articles
    .filter(
      (article: Article) =>
        article.category &&
        (article.category.id === categoryId ||
          article.category.name === categoryId)
    )
    .slice(0, 3); // 各カテゴリー最新3件
});
```

#### 3. Featured記事の選定

```typescript
// 最新1件をFeatured記事として表示
const featuredArticle = articles.length > 0 ? articles[0] : null;
```

#### 4. サイドバー用新着記事

```typescript
// Featured以外の最新10件
const recentArticles = articles.slice(1, 11);
```

## カテゴリー設定

### 動的カテゴリー管理（microCMS連携）

**カテゴリーはmicroCMSから自動的に取得され、動的に表示されます。**

#### カテゴリーアイコンマッピング

カテゴリーのアイコンのみ `src/pages/index.tsx` の `CATEGORY_ICON_MAP` で管理します。

```typescript
const CATEGORY_ICON_MAP: { [key: string]: React.ReactNode } = {
  'backend-dev': <svg>...</svg>,
  'cloud-infra': <svg>...</svg>,
  'scrum-agile': <svg>...</svg>,
  'mobile-dev': <svg>...</svg>,
  'frontend-dev': <svg>...</svg>,
  // 新しいカテゴリーのアイコンをここに追加
};
```

- カテゴリーIDをキーとして、対応するアイコンを定義
- ここにないカテゴリーはデフォルトアイコンを使用
- カテゴリー名やサブカテゴリーはmicroCMSから自動取得

### カテゴリーの追加方法

1. **microCMS側で新しいカテゴリーを作成**

   - カテゴリー名を設定（例: "AI & Machine Learning"）
   - カテゴリーIDを設定（例: "ai-ml"）

2. **（オプション）アイコンを追加**

   - `CATEGORY_ICON_MAP` に新しいエントリを追加
   - 追加しない場合はデフォルトアイコンが使用される

3. **記事にカテゴリーを設定**
   - microCMSで記事を作成・編集時にカテゴリーを選択

**これだけで自動的にTOPページに表示されます！**

### カテゴリー表示の仕組み

```typescript
// microCMSから取得したカテゴリーごとに記事を振り分け
const categoriesWithArticles: CategoryWithArticles[] = categories
  .map((category: Category) => {
    // 各カテゴリーの最新3件を取得
    const categoryArticles = articles
      .filter(
        (article: Article) =>
          article.category && article.category.id === category.id
      )
      .slice(0, 3);

    return {
      category,
      articles: categoryArticles,
    };
  })
  .filter((item: CategoryWithArticles) => item.articles.length > 0); // 記事があるカテゴリーのみ表示
```

- **記事が1件以上あるカテゴリーのみ表示**
- 各カテゴリーの最新3件を表示
- カテゴリーの順序はmicroCMSの登録順

## パフォーマンス最適化

### ISR設定

```typescript
return {
  props: { ... },
  revalidate: 60, // 60秒ごとに再生成
};
```

- **開発時**: 短い間隔（60秒）で頻繁に更新
- **本番環境**: 必要に応じて調整（例: 300秒 = 5分）

### Netlify On-Demand ISR（推奨）

Netlifyでは、microCMSのWebhookと連携してOn-Demand ISRを使用することを推奨します。

1. microCMS側でWebhookを設定
2. Netlify Build Hookを登録
3. 記事公開時に自動的に再ビルド

## 代替案との比較

### 案1: 1クエリ全件取得モデル（シンプル版）

**メリット:**

- 実装が最もシンプル
- APIリクエスト数が最小

**デメリット:**

- カテゴリー別の表示が難しい
- Featured記事の選定が単純（最新のみ）

### 案2: キュレーション（ピックアップ）型モデル

**メリット:**

- 編集者がFeatured記事を選べる
- 柔軟なコンテンツ管理

**デメリット:**

- APIリクエスト数が増える（2回以上）
- microCMS側の設定が複雑
- 運用コストが高い

### 案3: ハイブリッド型（採用案）

**メリット:**

- APIリクエスト数が最小（1回）
- カテゴリー別表示が可能
- 柔軟性とパフォーマンスのバランスが良い

**デメリット:**

- Next.js側のロジックがやや複雑
- カテゴリー設定の変更にはコード修正が必要

## 今後の拡張性

### ピックアップ機能の追加

将来的にピックアップ機能が必要になった場合:

```typescript
// microCMS側に `isFeatured` フィールドを追加
const featuredArticle = articles.find((a) => a.isFeatured) || articles[0];
```

### カテゴリー表示順のカスタマイズ

カテゴリーの表示順を変更したい場合:

```typescript
// microCMS側に `order` フィールドを追加
const categoriesWithArticles = categories
  .sort((a, b) => (a.order || 0) - (b.order || 0)) // orderフィールドでソート
  .map((category: Category) => {
    // ... 記事の振り分け
  });
```

### カテゴリーアイコンの動的管理

カテゴリーアイコンもmicroCMSで管理したい場合:

1. microCMSのカテゴリーAPIに `iconUrl` フィールドを追加
2. アイコン画像をアップロード
3. コンポーネント側で画像を表示

```typescript
icon={category.iconUrl ? (
  <img src={category.iconUrl} alt={category.name} className="w-6 h-6" />
) : (
  getCategoryIcon(category.id)
)}
```

## まとめ

この設計により、以下を実現しています:

✅ APIリクエスト数の最小化（コスト削減）  
✅ 高速なページ表示（SSG/ISR）  
✅ 柔軟なカテゴリー管理  
✅ メンテナンス性の高いコード  
✅ Netlifyとの高い親和性

---

**更新日**: 2026-03-18  
**バージョン**: 1.0.0
