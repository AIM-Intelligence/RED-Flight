//import { stakingContractABI } from "../constants/stakingContractABI";
import { getContractAddress } from "./contractAddress";
import { defineChain, getContract } from "thirdweb";

import { client } from "@/lib/client";

export const getAllContracts = (chainId: number) => {
  const ca = getContractAddress(chainId);
  const chain = defineChain(chainId ? chainId : 3441006);

  if (!ca) return null;

  // const contract = getContract({
  //   client: client,
  //   chain: chain,
  //   address: ca?.nftCollectionContractAddress,
  // });

  const NFT_DROP_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: ca?.nftDropContractAddress,
  });

  // const REWARD_TOKEN_CONTRACT = getContract({
  //   client: client,
  //   chain: chain,
  //   address: ca?.rewardTokenContractAddress,
  // });

  // const STAKING_CONTRACT = getContract({
  //   client: client,
  //   chain: chain,
  //   address: ca?.stakingContractAddress,
  //   abi: stakingContractABI,
  // });

  return {
    // contract,
    NFT_DROP_CONTRACT,
    // REWARD_TOKEN_CONTRACT,
    // STAKING_CONTRACT,
  };
};
