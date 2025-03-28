import Socials from './Socials';

const Header = () => {
  return (
    <>
      {/* 데스크탑 헤더 - lg 이상에서만 표시 */}
      <header className="absolute z-50 hidden w-full items-center px-16 xl:flex xl:h-[90px] xl:px-0">
        <div className="container mx-auto flex justify-between px-40">
          <div></div>
          <Socials />
        </div>
      </header>

      {/* 모바일 헤더 - lg 미만에서만 표시되며 오른쪽 하단에 고정 */}
      <div className="fixed bottom-24 right-4 z-50 xl:hidden">
        <Socials />
      </div>
    </>
  );
};

export default Header;
