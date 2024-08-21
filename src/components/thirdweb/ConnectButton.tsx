import { useRouter } from "next/navigation";

import { ConnectButton } from "thirdweb/react";

import { useWeb3User } from "@/hooks/user/useSignIn";
import { client } from "@/lib/client";
import { generatePayload, isLoggedIn, login, logout } from "@/server/auth/auth";
import { useWeb3UserStore } from "@/store/user-store";
import chainList from "@/utils/chain";

const ThirdwebConnectButton: React.FC = () => {
  const router = useRouter();
  const { refreshUser } = useWeb3User();
  const { user: currentUser, clearUser } = useWeb3UserStore();

  const appMetadata = {
    name: "RED Flight",
    url: "https://www.redflight.io",
    description: "AI Jailbreaking NFT Game",
    logoUrl: "/logo1.png",
  };

  return (
    <ConnectButton
      client={client}
      appMetadata={appMetadata}
      autoConnect={false}
      chains={chainList}
      auth={{
        isLoggedIn: async address => {
          console.log("checking if logged in!", { address });

          if (currentUser && currentUser.wallet_address !== address) {
            console.log("Address mismatch. Logging out.");
            await logout();
            router.push("/login");
          }
          return await isLoggedIn();
        },
        doLogin: async params => {
          console.log("logging in!");
          await login(params);
          await refreshUser();
        },
        getLoginPayload: async ({ address }) => generatePayload({ address }),
        doLogout: async () => {
          console.log("logging out!");
          await logout();
          clearUser();
        },
      }}
    />
  );
};

export default ThirdwebConnectButton;
