import { ConnectButton } from "thirdweb/react";
import Socials from "./Socials";
import { client } from "@/lib/client";
import chainList from "@/utils/chain";

const HeaderPage = () => {
  return (
    <header className="absolute z-50 w-full flex items-center px-16 xl:px-0 xl:h-[90px] max-sm:hidden">
      <div className="container mx-auto flex max-sm:justify-center justify-between max-sm:px-0 px-40">
        <ConnectButton
          appMetadata={{
            name: "RED Flight",
            url: "https://www.redflight.io",
          }}
          client={client}
          chains={chainList}
        />

        <Socials />
      </div>
    </header>
  );
};

export default HeaderPage;
