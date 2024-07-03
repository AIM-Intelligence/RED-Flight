import React, { useState } from "react";
import { useModal } from "@/store/use-modal-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { client } from "@/lib/client";
import { Button } from "../ui/button";
import { Input } from "../ui/animate-button";
import * as z from "zod";
import { MediaRenderer, useActiveAccount } from "thirdweb/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { upload } from "thirdweb/storage";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title must be at least 1 character.",
  }),
  description: z.string().min(1, {
    message: "Description must be at least 1 character.",
  }),
  prompt: z.string().min(1, {
    message: "Prompt must be at least 1 character.",
  }),
});

const UserInfoEditImage = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const { userInfo } = data;
  const isModalOpen = isOpen && type === "showUserInfoEditImage";

  const account = useActiveAccount();

  const [generatedImage, setGeneratedImage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      prompt: "",
    },
  });

  const handleGenerateAndMint = async (values: z.infer<typeof formSchema>) => {
    // setPrompt(convertedString);
    setIsGenerating(true);

    const imagePrompt = values.prompt;
    try {
      if (!prompt) return;
      console.log("Generating image");
      const res = await fetch("/api/generateprofile", {
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
        name: userInfo.name || "null",
        team: userInfo.teams || "null",
        score: userInfo.score || 0,
        nft_count: userInfo.nftCount || 0,
        title: values.title,
        desc: values.description,
      };

      if (!imageUri) {
        throw new Error("Error uploading image to IPFS");
      }
      setGeneratedImage(imageUri);
      setIsGenerating(false);
      setIsMinting(true);
      const mintRes = await fetch("/api/mintprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nftImage: imageUri,
          address: account?.address || "",
          traits,
        }),
      });

      userInfo.generatedImage = imageUri;

      if (!mintRes.ok) {
        throw new Error("Failed to mint NFT");
      }
      console.log("userInfo", userInfo);

      alert("Profile NFT minted successfully");
    } catch (error) {
      console.error(error);
    } finally {
      setIsMinting(false);
      setIsGenerating(false);
      onClose();
      onOpen("showUserInfoEdit", { userInfo });
    }
  };

  if (!userInfo) {
    return <div>Loading user info...</div>;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white ">
        <DialogHeader>
          <DialogTitle>Generate New Profile Image</DialogTitle>
        </DialogHeader>
        <div className="mt-5 flex flex-col w-full items-center justify-center">
          <div className="mb-5">
            {generatedImage ? (
              <MediaRenderer client={client} src={generatedImage} className="w-72 h-72 rounded-lg" />
            ) : (
              <div className="w-72 h-72 border border-dashed border-gray-400 rounded-lg flex justify-center items-center">
                <p className="text-gray-400">{isGenerating ? "Generating image..." : "No image generated"}</p>
              </div>
            )}
          </div>
          <div className="w-max-[200px] w-full">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleGenerateAndMint)} className="space-y-2">
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Enter Prompt" {...field} className="bg-slate-200" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Enter title" {...field} className="bg-slate-200" />
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
                        <Input placeholder="Enter description" {...field} className="bg-slate-200" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className={cn(
                    "relative  flex space-x-2 items-center justify-center px-4 w-full rounded-md h-10 font-medium shadow-input hover:cursor-pointer",
                    "focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-500 transition duration-100 ease-in-out",
                  )}
                  disabled={isGenerating || isMinting}
                >
                  {isGenerating ? "Generating..." : isMinting ? "Minting..." : "Generate and Mint"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserInfoEditImage;
