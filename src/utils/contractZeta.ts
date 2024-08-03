import { chain } from "./chain";
import { client } from "@/lib/client";
import { getContract } from "thirdweb";
import { stakingContractABI } from "./stakingContractABI";

export const nftCollectionContractAddress = "0x0B5eC88F7134dFBDA606F7678d06b8F23C3c759f";

export const profileNftCollectionContractAddress = "0x8DF94d5f59d2bA9bf418b0D2e37d12633Bc52a42";

export const contract = getContract({
  client: client,
  chain: chain,
  address: nftCollectionContractAddress,
});

export const nftDropContractAddress = "0x8DF94d5f59d2bA9bf418b0D2e37d12633Bc52a42";
export const rewardTokenContractAddress = "0x68d3487BEa57bC98D3cA5557edd0ba2ac90B57a1";
export const stakingContractAddress = "0x48df4BfBd00B18E7690F1edeED3BC00bFe2bb3B4";

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
