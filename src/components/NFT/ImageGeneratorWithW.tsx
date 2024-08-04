"use client";

import { useContext, useState } from "react";

import { Input } from "../ui/AnimateButton";
import { Button } from "../ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import {
  MediaRenderer,
  useActiveAccount,
  useActiveWalletChain,
} from "thirdweb/react";
import { upload } from "thirdweb/storage";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { MessagesContext } from "@/context/Messages";
import { convertMessages } from "@/hooks/useConvertMessages";
import { client } from "@/lib/client";
import { cn } from "@/lib/utils";
import useNFTStore from "@/store/tutorial-nft-store";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title must be at least 1 character.",
  }),
  description: z.string().min(1, {
    message: "Description must be at least 1 character.",
  }),
});

export const AIGenerate = ({ onClose }: { onClose: () => void }) => {
  const { messages } = useContext(MessagesContext);
  const imagePrompt = convertMessages(messages);
  const account = useActiveAccount();
  const { resetNFT, nft } = useNFTStore.getState();
  const chain = useActiveWalletChain();

  const [generatedImage, setGeneratedImage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleGenerateAndMint = async (values: z.infer<typeof formSchema>) => {
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

      const traits = {
        difficulty: nft.difficulty,
        title: values.title,
        desc: values.description,
        converation: nft.conversation,
        story: nft.story,
        length: nft.length,
        target: nft.target,
      };

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
          traits,
          chain: chain!.id,
        }),
      });

      if (!mintRes.ok) {
        throw new Error("Failed to mint NFT");
      }

      const { data: nftData, error } = await supabase
        .from("NFT_Prompt")
        .insert({
          image_url: imageUri,
          creator: account?.address,
          difficulty: nft.difficulty,
          prompt: messages,
          title: values.title,
          desc: values.description,
          conversation: nft.conversation,
          story: nft.story,
          length: nft.length,
          target: nft.target,
        });

      if (error) {
        console.error("Error saving NFT data to Supabase:", error);
      } else {
        console.log("NFT data saved to Supabase:", nftData);
      }

      alert("NFT minted successfully");
    } catch (error) {
      console.error(error);
    } finally {
      setIsMinting(false);
      resetNFT();
      onClose();
    }
  };

  if (account) {
    return (
      <div className="flex flex-col items-center p-5">
        <div>
          <div className="mb-5">
            {generatedImage ? (
              <MediaRenderer
                client={client}
                src={generatedImage}
                className="h-72 w-72 rounded-lg"
              />
            ) : (
              <div className="flex h-72 w-72 items-center justify-center rounded-lg border border-dashed border-gray-400">
                <p className="text-gray-400">
                  {isGenerating ? "Generating image..." : "No image generated"}
                </p>
              </div>
            )}
          </div>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleGenerateAndMint)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter title"
                          {...field}
                          className="bg-slate-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter description"
                          {...field}
                          className="bg-slate-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className={cn(
                    "relative flex h-10 w-full items-center justify-center space-x-2 rounded-md px-4 font-medium shadow-input hover:cursor-pointer",
                    "transition duration-100 ease-in-out focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-1",
                  )}
                  disabled={isGenerating || isMinting || messages.length < 1}
                >
                  {isGenerating
                    ? "Generating..."
                    : isMinting
                      ? "Minting..."
                      : "Generate and Mint"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    );
  }
};
