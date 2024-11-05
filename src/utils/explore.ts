export const getExplorerApiUrl = (chainId: number) => {
  switch (chainId) {
    case 11155111:
      return "https://eth-sepolia.blockscout.com/api/v2/transactions/";
    case 3441006:
      return "https://manta-sepolia.explorer.caldera.xyz/api/v2/transactions/";
    case 1313161555:
      return "https://explorer.testnet.aurora.dev/api/v2/transactions/";
    default:
      throw new Error("Unsupported chainId");
  }
};
