"use client";

import { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { ConnectEmbed } from "thirdweb/react";

import { useWeb3User } from "@/hooks/user/useSignIn";
import { client } from "@/lib/client";
import { generatePayload, isLoggedIn, login, logout } from "@/server/auth/auth";
import { useWeb3UserStore } from "@/store/user-store";
import { chainList } from "@/utils/chain";

const ThirdwebConnectButton: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useWeb3User();
  const { user: currentUser, clearUser } = useWeb3UserStore();

  const appMetadata = {
    name: "RED Flight",
    url: "https://www.redflight.io",
    description: "AI Jailbreaking NFT Game",
    logoUrl: "/logo1.png",
  };

  useEffect(() => {
    // Check for redirect parameter on component mount
    const redirectPath = searchParams.get("redirect");
    if (redirectPath && currentUser) {
      router.push(redirectPath);
    }
  }, [currentUser, router, searchParams]);

  return (
    <ConnectEmbed
      client={client}
      appMetadata={appMetadata}
      chains={chainList}
      auth={{
        isLoggedIn: async address => {
          console.log("checking if logged in!", { address });

          if (currentUser && currentUser.wallet_address !== address) {
            console.log("Address mismatch. Logging out.");
            await logout();
            clearUser();
            const currentPath = window.location.pathname;
            router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
          }
          return await isLoggedIn();
        },
        doLogin: async params => {
          console.log("logging in!");
          await login(params);
          await refreshUser();
          const redirectPath = searchParams.get("redirect");
          if (redirectPath) {
            router.push(redirectPath);
          } else {
            router.push("/");
          }
        },
        getLoginPayload: async ({ address }) => generatePayload({ address }),
        doLogout: async () => {
          console.log("logging out!");
          const currentPath = window.location.pathname;
          await logout();
          clearUser();
          router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
        },
      }}
    />
  );
};

export default ThirdwebConnectButton;
