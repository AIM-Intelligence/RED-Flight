//import { stakingContractABI } from "../constants/stakingContractABI";
import { defineChain, getContract } from 'thirdweb';

import { client } from '@/lib/client';
import { getContractAddress } from './contractAddress';

// TODO: Make "getAllContracts" just address

export const getAllContracts = (chainId: number) => {
  const ca = getContractAddress(chainId);
  const chain = defineChain(chainId);

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
