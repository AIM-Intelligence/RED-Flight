import React, { useState } from "react";

import { Input } from "../ui/AnimateButton";
import { Button } from "../ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { MediaRenderer, useActiveAccount } from "thirdweb/react";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { client } from "@/lib/client";
import { cn } from "@/lib/utils";
import { useModal } from "@/store/use-modal-store";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  email: z.string(),
});

const UserInfoEdit = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const { userInfo } = data;
  const isModalOpen = isOpen && type === "showUserInfoEdit";
  const [isLoading, setIsLoading] = useState(false);

  const account = useActiveAccount();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      email: "",
    },
  });

  const handleEditUserProfile = async (values: z.infer<typeof formSchema>) => {
    if (!account) {
      console.error("No active account found");
      return;
    }

    if (!values.name && !values.description && !values.email) {
      console.log("No changes made");
      return onClose();
    }
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("User")
        .update({
          name: values.name ? values.name : userInfo.name,
          description: values.description
            ? values.description
            : userInfo.description,
          email: values.email ? values.email : userInfo.email,
          image_url: userInfo.generatedImage
            ? userInfo.generatedImage
            : userInfo.image_url,
        })
        .eq("address", account.address);

      if (error) throw error;

      console.log("Profile updated successfully:", data);
      window.location.reload(); // Refresh the page
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating profile:", error);
      // Here you might want to show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  if (!userInfo) {
    return <div>Loading user info...</div>;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Info Edit</DialogTitle>
        </DialogHeader>
        <div className="mt-5 flex w-full flex-col items-center justify-center">
          <div className="mb-5">
            {userInfo.generatedImage ? (
              <MediaRenderer
                client={client}
                src={userInfo.generatedImage}
                className="h-72 w-72 rounded-lg"
              />
            ) : (
              <div
                className="flex h-72 w-72 cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-400"
                onClick={() => onOpen("showUserInfoEditImage", { userInfo })}
              >
                <p className="text-gray-400"> Generating image first </p>
              </div>
            )}
          </div>
          <div className="w-max-[200px] w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleEditUserProfile)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter Name"
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
                          placeholder="Enter Description"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter Email"
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
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserInfoEdit;
