import DefaultLayout from '@/components/layouts/DefaultLayout';

export default function About() {
  return (
    <DefaultLayout>
      <div className="max-w-[1200px] mx-auto mb-20 px-4">
        <h1 className="text-center text-2xl font-bold my-10">About</h1>
        <div className="space-y-6">
          <p>はじめまして。五月雨ラボの管理人です。</p>
          <p>
            普段はWeb系企業でフロントエンドエンジニアとして働いています。
            主にTypeScript、React、Next.jsを使用した開発を行っています。
          </p>
          <p>
            このブログでは、日々の開発で得た知見や、技術的な学びを共有していきます。
            特にフロントエンド開発に関する内容が中心となりますが、
            バックエンドやインフラなど、幅広い分野についても取り上げていく予定です。
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
}
