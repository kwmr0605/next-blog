const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-baseColor">
      {/* 背景のアニメーション雨粒 */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 bg-gradient-to-b from-accentColor/60 to-transparent rounded-full animate-rain"
            style={{
              left: `${Math.random() * 100}%`,
              height: `${Math.random() * 60 + 40}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 1 + 1.5}s`,
            }}
          />
        ))}
      </div>

      {/* メインローディング */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* 中央の「五」ロゴ */}
        <div className="relative">
          {/* 外側の波紋 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-2 border-accentColor/30 animate-ping-slow" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-32 h-32 rounded-full border-2 border-accentColor/20 animate-ping-slow"
              style={{ animationDelay: '0.5s' }}
            />
          </div>

          {/* ロゴカード */}
          <div className="relative w-24 h-24 bg-gradient-to-br from-accentColor/20 to-accentColor/5 backdrop-blur-glass-strong rounded-2xl flex items-center justify-center border border-subColor/30 shadow-neon animate-pulse-glow">
            {/* グロー効果 */}
            <div className="absolute inset-0 bg-accentColor/20 rounded-2xl blur-xl animate-pulse" />

            {/* 「五」文字 */}
            <span className="relative text-5xl font-bold text-subColor drop-shadow-[0_0_10px_rgba(82,190,198,0.8)] animate-float">
              五
            </span>

            {/* 水滴エフェクト */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2">
              <div className="w-2 h-2 bg-accentColor rounded-full animate-drip" />
            </div>
          </div>
        </div>

        {/* テキスト */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-subColor text-lg font-medium drop-shadow-lg animate-pulse">
            読み込み中
          </p>
          <div className="flex gap-1">
            <span
              className="w-2 h-2 bg-accentColor rounded-full animate-bounce"
              style={{ animationDelay: '0s' }}
            />
            <span
              className="w-2 h-2 bg-accentColor rounded-full animate-bounce"
              style={{ animationDelay: '0.2s' }}
            />
            <span
              className="w-2 h-2 bg-accentColor rounded-full animate-bounce"
              style={{ animationDelay: '0.4s' }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes rain {
          0% {
            transform: translateY(-100vh);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow:
              0 0 20px rgba(82, 190, 198, 0.5),
              0 0 40px rgba(82, 190, 198, 0.3);
          }
          50% {
            box-shadow:
              0 0 30px rgba(82, 190, 198, 0.8),
              0 0 60px rgba(82, 190, 198, 0.5);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes drip {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(30px) scale(0.5);
            opacity: 0;
          }
        }

        .animate-rain {
          animation: rain linear infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-drip {
          animation: drip 1.5s ease-in infinite;
        }
      `}</style>
    </div>
  );
};

export default Loading;
