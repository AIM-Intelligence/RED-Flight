const page = () => {
  return <div>page</div>;
};

export default page;
// "use client";

// import { useEffect } from "react";

// import { NFT } from "thirdweb";
// import { getNFTs, ownerOf, totalSupply } from "thirdweb/extensions/erc721";
// import {
//   useActiveAccount,
//   useActiveWalletChain,
//   useReadContract,
// } from "thirdweb/react";

// import { StakeRewards } from "@/components/thirdweb/staking/StakeRewards";
// import { StakedNFTCard } from "@/components/thirdweb/staking/StakedNFTCard";
// import { getAllContracts } from "@/utils/contract";

// const Page = () => {
//   const activeAccount = useActiveAccount();

//   const chain = useActiveWalletChain();

//   const chainId = chain ? chain.id : 1115;
//   const { contract, STAKING_CONTRACT } = getAllContracts(chainId);

//   //const [ownedNFTs, setOwnedNFTs] = useState<NFT[]>([]);

//   const getOwnedNFTs = async () => {
//     let ownedNFTs: NFT[] = [];

//     const totalNFTSupply = await totalSupply({
//       contract: contract,
//     });
//     const nfts = await getNFTs({
//       contract: contract,
//       start: 0,
//       count: parseInt(totalNFTSupply.toString()),
//     });

//     for (let nft of nfts) {
//       const owner = await ownerOf({
//         contract: contract,
//         tokenId: nft.id,
//       });
//       if (owner === activeAccount?.address) {
//         ownedNFTs.push(nft);
//       }
//     }
//     //setOwnedNFTs(ownedNFTs);
//   };

//   useEffect(() => {
//     if (activeAccount) {
//       getOwnedNFTs();
//     }
//   }, [activeAccount]);

//   const { data: stakedInfo, refetch: refetchStakedInfo } = useReadContract({
//     contract: STAKING_CONTRACT,
//     method: "getStakeInfo",
//     params: [(activeAccount?.address as `0x${string}`) || ""],
//   });

//   return (
//     <div className="z-10 mx-auto max-w-7xl">
//       <div className="overflow-hidden rounded-lg border border-red-600 bg-gray-800/70 p-8 shadow-2xl md:grid md:grid-cols-2 md:gap-8">
//         <div style={{ width: "100%", margin: "20px 0" }}>
//           <h2>Staked NFTs</h2>
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "row",
//               flexWrap: "wrap",
//               width: "500px",
//             }}
//           >
//             {stakedInfo && stakedInfo[0].length > 0 ? (
//               stakedInfo[0].map((nft: any, index: number) => (
//                 <StakedNFTCard
//                   key={index}
//                   tokenId={nft}
//                   refetchStakedInfo={refetchStakedInfo}
//                   refetchOwnedNFTs={getOwnedNFTs}
//                 />
//               ))
//             ) : (
//               <p style={{ margin: "20px" }}>No NFTs staked</p>
//             )}
//           </div>
//         </div>
//         <hr
//           style={{
//             width: "100%",
//             border: "1px solid #333",
//           }}
//         />
//         <StakeRewards />
//       </div>
//     </div>
//   );
// };

// export default Page;
