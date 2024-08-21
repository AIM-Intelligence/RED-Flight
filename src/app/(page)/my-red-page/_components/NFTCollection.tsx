const NFTCollection = () => {
  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-3xl font-extrabold text-red-600">NFT Collection</h2>
        <button className="rounded-md border border-red-500 bg-transparent px-4 py-2 text-sm font-medium text-red-600 transition-colors duration-300 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
          Refresh NFTs
        </button>
      </div>
      <div className="flex max-w-2xl flex-wrap items-center overflow-y-auto"></div>
    </>
  );
};

export default NFTCollection;
