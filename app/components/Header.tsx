import Logo from "./Logo";

const Header = () => {
  return (
    <header className="bg-slate-800">
      <div className="flex h-20 shrink-0 items-end md:h-52 p-10 w-4/5 mx-auto">
        <Logo />
      </div>
    </header>
  );
};

export default Header;
