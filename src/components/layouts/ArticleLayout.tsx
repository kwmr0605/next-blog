import { ReactNode } from 'react';
import Header from '../Header';
import Footer from '../Footer';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-[72px]">{children}</main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
