const page = () => {
  return <div></div>;
};

export default page;
// 'use client';

// import { useState } from 'react';
// import { nextTokenIdToMint } from 'thirdweb/extensions/erc721';
// import {
//   MediaRenderer,
//   useActiveWalletChain,
//   useReadContract,
// } from 'thirdweb/react';
// import { upload } from 'thirdweb/storage';

// import ThirdwebConnectButton from '@/components/thirdweb/ConnectButton';
// import { Button } from '@/components/ui/Button';
// import { Input } from '@/components/ui/Input';
// import { Textarea } from '@/components/ui/Textarea';
// import { client } from '@/lib/client';
// import { getAllContracts } from '@/utils/contract';

// interface GeneratedImage {
//   url: string;
//   blob: string; // base64 encoded blob
// }

// const Page = () => {
//   const [imagePrompt, setImagePrompt] = useState('');
//   const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
//   const [uploadedImages, setUploadedImages] = useState<string[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const [makeCount, setMakeCount] = useState(0);

//   const chain = useActiveWalletChain();

//   // TODO: error handling if chainId is 0
//   const chainId = chain ? chain.id : 3441006;

//   const { NFT_DROP_CONTRACT } = getAllContracts(chainId)!;

//   const { data: totalNFTSupply } = useReadContract(nextTokenIdToMint, {
//     contract: NFT_DROP_CONTRACT,
//     queryOptions: {
//       enabled: !!NFT_DROP_CONTRACT,
//     },
//   });

//   const handleGenerateMultiple = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsGenerating(true);
//     const newImages: GeneratedImage[] = [];
//     try {
//       for (let i = 0; i < makeCount; i++) {
//         const res = await fetch('/api/generate', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ imagePrompt }),
//         });

//         if (!res.ok) throw new Error(`Failed to generate image ${i + 1}`);

//         const data = await res.json();
//         newImages.push(data);
//       }
//       setGeneratedImages(newImages);
//       setImagePrompt('');
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleBatchUpload = async () => {
//     console.log('totalNFTSupply', totalNFTSupply);

//     setIsUploading(true);
//     try {
//       const files = generatedImages.map(
//         (img, index) =>
//           new File(
//             [Buffer.from(img.blob, 'base64')],
//             `${Number(totalNFTSupply)! + index}.png`,
//             {
//               type: 'image/png',
//             }
//           )
//       );

//       const imageUri = await upload({
//         client: client,
//         files: files,
//       });

//       if (!imageUri) throw new Error('Error uploading images to IPFS');
//       setUploadedImages(Array.isArray(imageUri) ? imageUri : [imageUri]);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleDownloadJSON = () => {
//     const metadata = uploadedImages.map((uri, index) => {
//       const imageNumber =
//         uri.split('/').pop()?.split('.')[0] || (index + 1).toString();
//       return {
//         name: `RED Flight Prompt NFT No.${imageNumber}`,
//         description: 'AI Jailbreaking NFT made by RED Flight',
//         image: uri,
//       };
//     });

//     const jsonString = JSON.stringify(metadata, null, 2);
//     const blob = new Blob([jsonString], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'metadata.json';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="flex flex-col items-center p-5">
//       <ThirdwebConnectButton />
//       <h2 className="mb-4 mt-4 text-2xl font-bold text-white">
//         Generated Images
//       </h2>
//       <div className="mb-8 grid grid-cols-5 gap-4">
//         {generatedImages.map((image, index) => (
//           <img
//             key={index}
//             src={image.url}
//             alt={`Generated image ${index + 1}`}
//             className="h-[100px] w-[100px] rounded-lg object-cover"
//           />
//         ))}
//       </div>

//       <form
//         onSubmit={handleGenerateMultiple}
//         className="mb-8 flex w-full max-w-md flex-col items-center gap-2"
//       >
//         <Textarea
//           placeholder="Enter image prompt..."
//           value={imagePrompt}
//           onChange={(e) => setImagePrompt(e.target.value)}
//           className="w-full rounded-md border border-gray-300 px-3"
//         />
//         <div className="flex w-full items-center gap-2">
//           <Input
//             type="number"
//             min="1"
//             max="10"
//             value={makeCount}
//             onChange={(e) =>
//               setMakeCount(
//                 Math.max(1, Math.min(10, parseInt(e.target.value) || 1))
//               )
//             }
//             className="w-24 rounded-md border border-gray-300 px-3"
//           />
//           <Button
//             type="submit"
//             disabled={!imagePrompt || isGenerating}
//             className="h-10 grow rounded-md bg-gray-800 text-white disabled:opacity-50"
//           >
//             {isGenerating
//               ? `Generating ${makeCount} images...`
//               : `Generate ${makeCount} Images`}
//           </Button>
//         </div>
//       </form>

//       {generatedImages.length > 0 && (
//         <Button
//           onClick={handleBatchUpload}
//           disabled={isUploading}
//           className="mb-8 h-10 w-full max-w-md rounded-md bg-blue-600 text-white disabled:opacity-50"
//         >
//           {isUploading
//             ? `Uploading ${generatedImages.length} images...`
//             : `Upload ${generatedImages.length} Images to IPFS`}
//         </Button>
//       )}

//       {uploadedImages.length > 0 && (
//         <Button
//           onClick={handleDownloadJSON}
//           className="mb-8 h-10 w-full max-w-md rounded-md bg-green-600 text-white"
//         >
//           Download Metadata JSON
//         </Button>
//       )}

//       {uploadedImages.length > 0 && (
//         <>
//           <h2 className="mb-4 text-2xl font-bold">Uploaded Images</h2>
//           <div className="grid grid-cols-5 gap-4">
//             {uploadedImages.map((uri, index) => {
//               console.log(`Uploaded image ${index + 1} URI:`, uri);
//               return (
//                 <MediaRenderer
//                   key={index}
//                   client={client}
//                   src={uri}
//                   alt={`Uploaded image ${index + 1}`}
//                   className="h-[100px] w-[100px] rounded-lg"
//                 />
//               );
//             })}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Page;
