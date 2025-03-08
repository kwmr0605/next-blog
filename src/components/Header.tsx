import Link from "next/link";

const Header = () => {
  return (
    <header className="h-10 max-w-[1200px] mx-auto leading-10 flex justify-between">
      <div className="flex justify-start">
        <Link href="/">
          <p className="font-bold">五月雨ラボ</p>
        </Link>
      </div>
      <div className="flex justify-end gap-4">
        <Link href="/">Home</Link>
        <Link href="/">Articles</Link>
        <Link href="/">About</Link>
      </div>
    </header>
  );
};

export default Header;
