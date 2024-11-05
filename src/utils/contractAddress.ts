const addressList = [
  {
    "3441006": {
      nftCollectionContractAddress: "",
      profileNftCollectionContractAddress: "",
      nftDropContractAddress: "0xFF5EFc6274bFE2d91b495529f2932997F921b71a",
      rewardTokenContractAddress: "",
      stakingContractAddress: "",
    },
  },
  {
    "11155111": {
      nftCollectionContractAddress: "",
      profileNftCollectionContractAddress: "",
      nftDropContractAddress: "0x06F01BA25C8ec85C7bBBAFdA1064c5DDF278C904",
      rewardTokenContractAddress: "",
      stakingContractAddress: "",
    },
  },
  {
    "1313161555": {
      nftCollectionContractAddress: "",
      profileNftCollectionContractAddress: "",
      nftDropContractAddress: "0x4DfeA1907E86Bb14dc5E42357d1178cbDDD12611",
      rewardTokenContractAddress: "",
      stakingContractAddress: "",
    },
  },
  {
    "1": {
      nftCollectionContractAddress: "",
      profileNftCollectionContractAddress: "",
      nftDropContractAddress: "",
      rewardTokenContractAddress: "",
      stakingContractAddress: "",
    },
  },
];

export const getContractAddress = (chainId: number) => {
  const id = chainId.toString();
  const result = addressList.find(item => Object.keys(item)[0] == id);
  return result ? Object.values(result)[0] : null;
};
