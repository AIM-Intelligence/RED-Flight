import Socials from "./Socials";

const Header = () => {
  return (
    <header className="absolute z-50 flex w-full items-center px-16 max-sm:hidden xl:h-[90px] xl:px-0">
      <div className="container mx-auto flex justify-between px-40 max-sm:justify-center max-sm:px-0">
        <div></div>

        <Socials />
      </div>
    </header>
  );
};

export default Header;
