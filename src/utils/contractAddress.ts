const addressList = [
  {
    // zeta
    "7001": {
      nftCollectionContractAddress: "0x0B5eC88F7134dFBDA606F7678d06b8F23C3c759f",
      profileNftCollectionContractAddress: "0x8DF94d5f59d2bA9bf418b0D2e37d12633Bc52a42",
      nftDropContractAddress: "0x8DF94d5f59d2bA9bf418b0D2e37d12633Bc52a42",
      rewardTokenContractAddress: "0x68d3487BEa57bC98D3cA5557edd0ba2ac90B57a1",
      stakingContractAddress: "0x48df4BfBd00B18E7690F1edeED3BC00bFe2bb3B4",
    },
  },
  {
    // manta
    "3441006": {
      nftCollectionContractAddress: "0x0265615b0Ea4Ef75d31640D96408033a85C8C584",
      profileNftCollectionContractAddress: "0x2B6CCC8aAA3d1d9718376be9053e85043D26f759",
      nftDropContractAddress: "0x4de63A0079d1f9B30Fc4e9F913b5C6Fb81556adD",
      rewardTokenContractAddress: "0x266dda99408e839446E2b9B4d3D872A6B5FA0d8d",
      stakingContractAddress: "0xa170aac4BE1406dA6f070F0F0E1143f432dbB0B9",
    },
  },
  {
    // zkSync
    "300": {
      nftCollectionContractAddress: "0xc5DaA1605f4c5854a2127FcE22aCad1aD6Fa7DF7",
      profileNftCollectionContractAddress: "0x5409E93c73c68c4CA41bD6D891a23d11380B3E6d",
      nftDropContractAddress: "0xC9ee30Ca1CB0208CA4C96Fd7E6a478CcF2F18b40",
      rewardTokenContractAddress: "0x8f9D35D20eE0709D60d7046ae53B87e9F2dF7a66",
      stakingContractAddress: "0x365C45a668340C4d81e47eEEc477B705aD3919A0",
    },
  },
  {
    // core
    "1115": {
      nftCollectionContractAddress: "",
      profileNftCollectionContractAddress: "",
      nftDropContractAddress: "",
      rewardTokenContractAddress: "",
      stakingContractAddress: "",
    },
  },
];

export const getContractAddress = (chainId: number | undefined) => {
  if (chainId == undefined) return;
  const id = chainId.toString();
  const result = addressList.find(item => Object.keys(item)[0] == id);
  return result ? Object.values(result)[0] : null;
};
