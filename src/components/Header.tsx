import { useRouter } from "next/navigation";

import Socials from "./Socials";

import ThirdwebConnectButton from "@/components/thirdweb/ConnectButton";

const Header = () => {
  const router = useRouter();

  return (
    <header className="z-100 fixed top-0 flex h-[82px] w-full items-center justify-between bg-black bg-opacity-50 px-16 max-sm:hidden xl:h-[90px]">
      <div
        className="flex h-[100%] cursor-pointer items-center justify-center gap-1"
        onClick={() => router.push("/")}
      >
        <img src="/logo1.png" className="h-[28px]" />
        <span>RED FLIGHT</span>
      </div>
      <ThirdwebConnectButton />
      <Socials />
    </header>
  );
};

export default Header;
