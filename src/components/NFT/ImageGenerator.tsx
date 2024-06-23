"use client";

import { chain } from "@/utils/chain";
import { client } from "@/lib/client";
import { useContext, useState } from "react";
import { ConnectButton, MediaRenderer, useActiveAccount } from "thirdweb/react";
import { upload } from "thirdweb/storage";

import { MessagesContext } from "@/context/messages";
import { convertMessages } from "@/hooks/useConvertMessages";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export const AIGenerate = () => {
  const { messages } = useContext(MessagesContext);
  const imagePrompt = convertMessages(messages);
  const account = useActiveAccount();

  const [generatedImage, setGeneratedImage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  const router = useRouter();

  const handleGenerateAndMint = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setPrompt(convertedString);
    setIsGenerating(true);
    try {
      if (!imagePrompt) return;
      console.log("Generating image");
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imagePrompt,
        }),
      });

      console.log("Generated image");
      if (!res.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await res.json();
      setGeneratedImage(data.imageData);

      console.log("Minting NFT");
      setIsGenerating(false);
      setIsMinting(true);

      // Convert base64 to blob
      const fetchRes = await fetch(data.imageData);
      const blob = await fetchRes.blob();

      const file = new File([blob], "image.png", { type: "image/png" });
      const imageUri = await upload({
        client: client,
        files: [file],
      });

      if (!imageUri) {
        throw new Error("Error uploading image to IPFS");
      }
      setGeneratedImage(imageUri);
      setIsGenerating(false);
      setIsMinting(true);
      const mintRes = await fetch("/api/mint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nftImage: imageUri,
          address: account?.address || "",
        }),
      });

      if (!mintRes.ok) {
        throw new Error("Failed to mint NFT");
      }

      const { data: nftData, error } = await supabase.from("NFT_Prompt").insert({
        image_url: imageUri,
        creator: account?.address || "",
        difficulty: 1,
        prompt: messages,
      });

      if (error) {
        console.error("Error saving NFT data to Supabase:", error);
      } else {
        console.log("NFT data saved to Supabase:", nftData);
      }

      alert("NFT minted successfully");

      router.push("/my-page");
    } catch (error) {
      console.error(error);
    } finally {
      setIsMinting(false);
    }
  };

  if (account) {
    return (
      <div className="flex flex-col items-center p-5">
        <ConnectButton client={client} chain={chain} />
        <div className="mt-5">
          <div className="mb-5">
            {generatedImage ? (
              <MediaRenderer client={client} src={generatedImage} className="w-72 h-72 rounded-lg" />
            ) : (
              <div className="w-72 h-72 border border-dashed border-gray-400 rounded-lg flex justify-center items-center">
                <p className="text-gray-400">{isGenerating ? "Generating image..." : "No image generated"}</p>
              </div>
            )}
          </div>
          <div>
            <form onSubmit={handleGenerateAndMint}>
              {messages.length < 1 || !generatedImage || isMinting ? (
                <div className="flex flex-col items-center">
                  <button
                    type="submit"
                    disabled={isGenerating || isMinting}
                    className="w-72 h-10 bg-gray-800 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? "Generating..." : isMinting ? "Minting..." : "Generate and Mint"}
                  </button>
                </div>
              ) : (
                <></>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
};
