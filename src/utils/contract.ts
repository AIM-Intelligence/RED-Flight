import { client } from "@/lib/client";
import { defineChain, getContract } from "thirdweb";
import { stakingContractABI } from "./stakingContractABI";
import { getContractAddress } from "./contractAddress";

export const getAllContracts = (chainId: number) => {
  const ca = getContractAddress(chainId);
  const chain = defineChain(chainId ? chainId : 7001);

  const contract = getContract({
    client: client,
    chain: chain,
    address: ca.nftCollectionContractAddress,
  });

  const NFT_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: ca.nftDropContractAddress,
  });

  const REWARD_TOKEN_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: ca.rewardTokenContractAddress,
  });

  const STAKING_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: ca.stakingContractAddress,
    abi: stakingContractABI,
  });

  return { contract, NFT_CONTRACT, REWARD_TOKEN_CONTRACT, STAKING_CONTRACT };
};
