import Socials from "./Socials";

const Header = () => {
  return (
    <header className="absolute z-20 w-full flex items-center px-16 xl:px-0 xl:h-[90px] max-sm:hidden">
      <div className="container mx-auto flex max-sm:justify-center justify-between max-sm:px-0 px-40">
        <div className="max-sm:hidden"></div>

        <Socials />
      </div>
    </header>
  );
};

export default Header;
