import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        {/* ファビコン設定 */}
        <link rel="icon" href="/images/icon.png" type="image/png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/icon.png" />
        <meta name="theme-color" content="#738b93" />

        {/* メタ情報 */}
        <meta
          name="description"
          content="五月雨ラボ - 技術ブログ。フロントエンド、バックエンド、AI駆動開発に関する知見を共有しています。"
        />
        <meta property="og:title" content="五月雨ラボ" />
        <meta
          property="og:description"
          content="技術ブログ - フロントエンド、バックエンド、AI駆動開発に関する知見を共有"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/icon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
