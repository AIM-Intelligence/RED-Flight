import { chain } from "./chain";
import { client } from "@/lib/client";
import { getContract } from "thirdweb";
import { stakingContractABI } from "./stakingContractABI";

export const nftCollectionContractAddress = "0x0265615b0Ea4Ef75d31640D96408033a85C8C584";

export const profileNftCollectionContractAddress = "0x2B6CCC8aAA3d1d9718376be9053e85043D26f759";

export const contract = getContract({
  client: client,
  chain: chain,
  address: nftCollectionContractAddress,
});

export const nftContractAddress = "0x4de63A0079d1f9B30Fc4e9F913b5C6Fb81556adD";
export const rewardTokenContractAddress = "0x266dda99408e839446E2b9B4d3D872A6B5FA0d8d";
export const stakingContractAddress = "0xa170aac4BE1406dA6f070F0F0E1143f432dbB0B9";

export const NFT_CONTRACT = getContract({
  client: client,
  chain: chain,
  address: nftContractAddress,
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
