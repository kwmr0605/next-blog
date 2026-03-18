import DefaultLayout from '@/components/layouts/DefaultLayout';
import Image from 'next/image';

// スキルセットデータ
const skillsets = [
  {
    category: 'フロントエンド / アプリ',
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
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-400/40',
    data: [
      { name: 'HTML / CSS / SCSS', value: 9 },
      { name: 'JavaScript / TypeScript', value: 7 },
      { name: 'Vue.js / Nuxt.js', value: 7 },
      { name: 'React / Next.js', value: 4 },
      { name: 'Flutter', value: 4 },
    ],
  },
  {
    category: 'バックエンド / インフラ',
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
          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
        />
      </svg>
    ),
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-400/40',
    data: [
      { name: 'Python (Django)', value: 6 },
      { name: 'Java (Spring)', value: 5 },
      { name: 'Go', value: 4 },
      { name: 'AWS', value: 5 },
      { name: 'Docker', value: 6 },
    ],
  },
  {
    category: 'マネジメント / AI / その他',
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
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-400/40',
    data: [
      { name: 'スクラム / チーム開発', value: 7 },
      { name: 'AI駆動開発 (Copilot等活用)', value: 6 },
      { name: 'プロンプトエンジニアリング', value: 5 },
    ],
  },
];

// スキルバーコンポーネント
const SkillBar = ({ name, value }: { name: string; value: number }) => {
  const percentage = (value / 10) * 100;

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-fontColor group-hover:text-accentColor transition-colors">
          {name}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-fontSecondary">{value}/10</span>
          {/* 星表示 */}
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${
                  i < Math.ceil(value / 2)
                    ? 'text-accentColor drop-shadow-[0_0_4px_rgba(82,190,198,0.8)]'
                    : 'text-fontSecondary/30'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      {/* プログレスバー */}
      <div className="h-2 bg-glassBg backdrop-blur-glass rounded-full overflow-hidden border border-subColor/20">
        <div
          className="h-full bg-gradient-to-r from-accentColor to-subColor rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(82,190,198,0.5)] group-hover:shadow-[0_0_15px_rgba(82,190,198,0.8)]"
          style={{
            width: `${percentage}%`,
            animation: 'slideIn 1s ease-out',
          }}
        />
      </div>
    </div>
  );
};

export default function About() {
  return (
    <DefaultLayout>
      <div className="max-w-[1400px] mx-auto mb-20 px-6 py-12">
        {/* ヒーローセクション */}
        <div className="glass-card rounded-2xl p-8 md:p-12 mb-12 shadow-glass relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-accentColor/10 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accentColor/5 rounded-full blur-3xl animate-pulse-glow delay-1000"></div>

          <div className="flex flex-col md:flex-row items-center gap-8 relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-accentColor/30 shadow-neon flex-shrink-0 animate-float bg-glassBg backdrop-blur-glass">
              <Image
                src="/images/icon.png"
                alt="五月雨ラボ アイコン"
                width={128}
                height={128}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-subColor drop-shadow-lg mb-2">
                五月雨ラボ
              </h1>
              <p className="text-fontSecondary text-base md:text-lg mb-4">
                Tech Blog & Engineering Portfolio
              </p>
              <p className="text-fontColor leading-relaxed max-w-2xl">
                Web系企業でバックエンドエンジニアとして働いています。現在は特にAI駆動開発に力を入れており、LLMに関する知識を積極的にインプットしています。このブログでは、日々の開発で得た知見や、AI・プロンプトエンジニアリングを含む技術的な学びを共有していきます。
              </p>
            </div>
          </div>
        </div>

        {/* スキルセットセクション */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-accentColor/20 backdrop-blur-sm border border-accentColor/40 flex items-center justify-center shadow-neon flex-shrink-0 self-center">
              <svg
                className="w-5 h-5 text-accentColor"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-subColor drop-shadow-lg leading-tight self-center">
              Skill Set
            </h2>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsets.map((skillset, index) => (
              <div
                key={skillset.category}
                className="glass-card rounded-xl p-6 shadow-glass relative overflow-hidden group hover:shadow-neon transition-all duration-300"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* グラデーション背景 */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${skillset.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* グローエフェクト */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-accentColor/10 rounded-full blur-2xl"></div>

                {/* ヘッダー */}
                <div className="flex items-center gap-3 mb-6 relative">
                  <div
                    className={`w-12 h-12 rounded-full bg-accentColor/20 backdrop-blur-sm border ${skillset.borderColor} flex items-center justify-center shadow-neon group-hover:scale-110 transition-transform`}
                  >
                    <div className="text-accentColor">{skillset.icon}</div>
                  </div>
                  <h3 className="text-base font-bold text-subColor drop-shadow-md">
                    {skillset.category}
                  </h3>
                </div>

                {/* スキルリスト */}
                <div className="space-y-4 relative">
                  {skillset.data.map((skill) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      value={skill.value}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 統計情報 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Years of Experience', value: '5+', icon: '📅' },
            { label: 'Projects Completed', value: '30+', icon: '🚀' },
            { label: 'Technologies', value: '15+', icon: '⚡' },
            { label: 'Coffee Consumed', value: '∞', icon: '☕' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="glass-card rounded-xl p-6 shadow-glass text-center group hover:shadow-neon transition-all relative overflow-hidden"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1 + 0.3}s both`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accentColor/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div
                className="text-3xl mb-2 animate-float"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-accentColor drop-shadow-[0_0_10px_rgba(82,190,198,0.5)] mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-fontSecondary">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            width: 0%;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </DefaultLayout>
  );
}
