import DefaultLayout from '@/components/layouts/DefaultLayout';

export default function About() {
  return (
    <DefaultLayout>
      <div className="max-w-[1200px] mx-auto mb-20 px-6 py-12">
        {/* タイトルセクション */}
        <div className="glass-card rounded-2xl p-8 mb-8 shadow-glass relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-accentColor/10 rounded-full blur-3xl"></div>
          <h1 className="text-center text-3xl font-bold text-subColor drop-shadow-lg relative">About</h1>
        </div>

        {/* コンテンツ */}
        <div className="glass-card rounded-2xl p-8 shadow-glass relative overflow-hidden">
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accentColor/5 rounded-full blur-3xl"></div>
          
          <div className="space-y-6 text-fontColor leading-relaxed relative">
            <div className="flex items-center gap-4 pb-6 border-b border-subColor/20">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accentColor to-accentColor/60 flex items-center justify-center shadow-neon">
                <span className="text-subColor text-2xl font-bold">五</span>
              </div>
              <div>
                <p className="text-xl font-bold text-subColor drop-shadow-md">五月雨ラボ</p>
                <p className="text-fontSecondary text-sm">Tech Blog</p>
              </div>
            </div>

            <p className="text-lg">
              はじめまして。五月雨ラボの管理人です。
            </p>
            
            <div className="glass-card rounded-xl p-6 bg-glassBg backdrop-blur-glass">
              <h3 className="text-subColor font-bold mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-accentColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                職業
              </h3>
              <p>
                普段はWeb系企業でフロントエンドエンジニアとして働いています。
                主にTypeScript、React、Next.jsを使用した開発を行っています。
              </p>
            </div>

            <div className="glass-card rounded-xl p-6 bg-glassBg backdrop-blur-glass">
              <h3 className="text-subColor font-bold mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-accentColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                このブログについて
              </h3>
              <p>
                このブログでは、日々の開発で得た知見や、技術的な学びを共有していきます。
                特にフロントエンド開発に関する内容が中心となりますが、
                バックエンドやインフラなど、幅広い分野についても取り上げていく予定です。
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4">
              {['TypeScript', 'React', 'Next.js', 'Node.js', 'AWS', 'Docker'].map((tech) => (
                <span key={tech} className="px-4 py-2 glass-card rounded-full text-sm text-fontColor hover:text-accentColor hover:shadow-neon transition cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
