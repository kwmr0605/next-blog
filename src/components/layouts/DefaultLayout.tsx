import { ReactNode } from "react";
import Header from "../Header";
import Footer from "../Footer";

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
