import Socials from "./Socials";
import { ConnectButton } from "thirdweb/react";

import { client } from "@/lib/client";
import chainList from "@/utils/chain";

const HeaderPage = () => {
  return (
    <header className="absolute z-50 flex w-full items-center px-16 max-sm:hidden xl:h-[90px] xl:px-0">
      <div className="container mx-auto flex justify-between px-40 max-sm:justify-center max-sm:px-0">
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
