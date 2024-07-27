import { chain } from "./chain";
import { client } from "@/lib/client";
import { getContract } from "thirdweb";
import { stakingContractABI } from "./stakingContractABI";

export const nftCollectionContractAddress = "0xc5DaA1605f4c5854a2127FcE22aCad1aD6Fa7DF7";

export const profileNftCollectionContractAddress = "0x5409E93c73c68c4CA41bD6D891a23d11380B3E6d";

export const contract = getContract({
  client: client,
  chain: chain,
  address: nftCollectionContractAddress,
});

export const nftDropContractAddress = "0xC9ee30Ca1CB0208CA4C96Fd7E6a478CcF2F18b40";
export const rewardTokenContractAddress = "0x8f9D35D20eE0709D60d7046ae53B87e9F2dF7a66";
export const stakingContractAddress = "0x365C45a668340C4d81e47eEEc477B705aD3919A0";

export const NFT_CONTRACT = getContract({
  client: client,
  chain: chain,
  address: nftDropContractAddress,
});

export const REWARD_TOKEN_CONTRACT = getContract({
  client: client,
  chain: chain,
  address: rewardTokenContractAddress,
});

export const STAKING_CONTRACT = getContract({
  client: client,
  chain: chain,
  address: stakingContractAddress,
  abi: stakingContractABI,
});
