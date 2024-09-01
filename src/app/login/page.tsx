"use client";

import { useEffect } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  ConnectEmbed,
  useActiveWallet,
  useActiveWalletChain,
} from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";

import { useWeb3User } from "@/hooks/user/useSignIn";
import { client } from "@/lib/client";
import { generatePayload, isLoggedIn, login, logout } from "@/server/auth/auth";
import { useWeb3UserStore } from "@/store/user-store";
import { chainList } from "@/utils/chain";

const ThirdwebConnectButton: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { refreshUser } = useWeb3User();
  const { user: currentUser, clearUser } = useWeb3UserStore();
  const chainId = useActiveWalletChain();
  const activeWallet = useActiveWallet();

  const appMetadata = {
    name: "RED Flight",
    url: "https://www.redflight.io",
    description: "AI Jailbreaking NFT Game",
    logoUrl: "/logo1.png",
  };

  const wallets = [
    inAppWallet({
      auth: {
        options: [
          "google",
          "discord",
          "telegram",
          "email",
          "facebook",
          "passkey",
          "phone",
        ],
      },
    }),
    createWallet("io.metamask"),
  ];

  useEffect(() => {
    const handleAuth = async () => {
      if (!activeWallet) {
        await logout();
        clearUser();
        const currentPath = window.location.pathname;
        router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
      }
    };

    if (!activeWallet && pathname !== "/" && pathname !== "/login") {
      handleAuth();
    }

    // Check for redirect parameter on component mount
    const redirectPath = searchParams.get("redirect");
    if (redirectPath && currentUser) {
      router.push(redirectPath);
    }
  }, [currentUser, router, searchParams, activeWallet]);

  return (
    <ConnectEmbed
      client={client}
      appMetadata={appMetadata}
      autoConnect={false}
      wallets={wallets}
      chains={chainList}
      auth={{
        isLoggedIn: async address => {
          console.log("checking if logged in!", { address });
          console.log("chainId", chainId && chainId.id);

          if (currentUser && currentUser.wallet_address !== address) {
            await logout();
            clearUser();
            const currentPath = window.location.pathname;
            router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
          }

          return await isLoggedIn();
        },
        doLogin: async params => {
          await login(params);
          await refreshUser();
          // After successful login, check for redirect parameter
          const redirectPath = searchParams.get("redirect");
          if (redirectPath) {
            router.push(redirectPath);
          } else {
            router.push("/"); // Default redirect if no path is specified
          }
        },
        getLoginPayload: async ({ address }) => generatePayload({ address }),
        doLogout: async () => {
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
