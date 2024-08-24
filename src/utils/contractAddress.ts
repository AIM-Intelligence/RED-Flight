const addressList = [
  {
    "3441006": {
      nftCollectionContractAddress:
        "0x0265615b0Ea4Ef75d31640D96408033a85C8C584",
      profileNftCollectionContractAddress:
        "0x2B6CCC8aAA3d1d9718376be9053e85043D26f759",
      nftDropContractAddress: "0x4de63A0079d1f9B30Fc4e9F913b5C6Fb81556adD",
      rewardTokenContractAddress: "0x266dda99408e839446E2b9B4d3D872A6B5FA0d8d",
      stakingContractAddress: "0xa170aac4BE1406dA6f070F0F0E1143f432dbB0B9",
    },
  },
];

export const getContractAddress = (chainId: number) => {
  const id = chainId.toString();
  const result = addressList.find(item => Object.keys(item)[0] == id);
  return result ? Object.values(result)[0] : null;
};
