import { useEffect } from "react";

import { prepareContractCall, toEther } from "thirdweb";
import { balanceOf } from "thirdweb/extensions/erc721";
import {
  TransactionButton,
  useActiveAccount,
  useConnectedWallets,
  useReadContract,
} from "thirdweb/react";

import { getAllContracts } from "@/utils/contract";

export const StakeRewards = () => {
  const account = useActiveAccount();
  const wallet = useConnectedWallets();

  const chainId = wallet[0]?.getChain()?.id ?? 7001;
  const { REWARD_TOKEN_CONTRACT, STAKING_CONTRACT } = getAllContracts(chainId);

  const {
    data: tokenBalance,
    isLoading: isTokenBalanceLoading,
    refetch: refetchTokenBalance,
  } = useReadContract(balanceOf, {
    contract: REWARD_TOKEN_CONTRACT,
    owner: (account?.address as `0x${string}`) || "",
  });

  const { data: stakedInfo, refetch: refetchStakedInfo } = useReadContract({
    contract: STAKING_CONTRACT,
    method: "getStakeInfo",
    params: [(account?.address as `0x${string}`) || ""],
  });

  useEffect(() => {
    refetchStakedInfo();
    const interval = setInterval(() => {
      refetchStakedInfo();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        margin: "20px 0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {!isTokenBalanceLoading && (
        <p>
          Wallet Balance:{" "}
          {tokenBalance ? toEther(BigInt(tokenBalance!.toString())) : 0}
        </p>
      )}
      <h2 style={{ marginBottom: "20px" }}>
        Stake Rewards: {stakedInfo && toEther(BigInt(stakedInfo[1].toString()))}
      </h2>
      <TransactionButton
        transaction={() =>
          prepareContractCall({
            contract: STAKING_CONTRACT,
            method: "claimRewards",
          })
        }
        onTransactionConfirmed={() => {
          alert("Rewards claimed!");
          refetchStakedInfo();
          refetchTokenBalance();
        }}
        style={{
          border: "none",
          backgroundColor: "#333",
          color: "#fff",
          padding: "10px",
          borderRadius: "10px",
          cursor: "pointer",
          width: "100%",
          fontSize: "12px",
        }}
      >
        Claim Rewards
      </TransactionButton>
    </div>
  );
};
