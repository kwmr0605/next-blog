import { ReactNode } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import type { Article } from '../../type/Article';

type DefaultLayoutProps = {
  children:
    | ReactNode
    | ((props: {
        setHoveredArticle: (article: Article | null) => void;
      }) => ReactNode);
};

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const setHoveredArticle = () => {
    // 新しいデザインではホバー機能は使わないので、空の実装
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {typeof children === 'function'
          ? children({ setHoveredArticle })
          : children}
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
