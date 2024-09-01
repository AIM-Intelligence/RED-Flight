import React, { useCallback, useMemo } from "react";

import { Input } from "../ui/AnimateButton";
import { Button } from "../ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { useUpdateWeb3User } from "@/hooks/user/useUpdateUser";
import { cn } from "@/lib/utils";
import { useModal } from "@/store/use-modal-store";

const formSchema = z.object({
  name: z.string().nullable(),
  description: z.string().nullable(),
  email: z.string().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

const UserInfoEditModal: React.FC = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { updateUser, isUpdating } = useUpdateWeb3User();
  const isModalOpen = isOpen && type === "showUserInfoEdit";

  const { user_info } = data;

  const defaultValues = useMemo(
    () => ({
      name: user_info?.name ?? null,
      description: user_info?.description ?? null,
      email: user_info?.email ?? null,
    }),
    [user_info],
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleEditUserProfile = useCallback(
    async (values: FormValues) => {
      if (!user_info) return;

      const hasChanges = Object.keys(values).some(
        key =>
          values[key as keyof FormValues] !==
          defaultValues[key as keyof FormValues],
      );

      if (!hasChanges) {
        console.log("No changes made");
        return onClose();
      }

      await updateUser({
        ...values,
        imageUrl: user_info.image_url,
      });

      onClose();
    },
    [user_info, defaultValues, updateUser, onClose],
  );

  if (!user_info) {
    return <div>User information not available.</div>;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="border-red-600 bg-black text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User Information</DialogTitle>
        </DialogHeader>
        <div className="mt-5 flex w-full flex-col items-center justify-center">
          <div className="mb-5 text-center">
            Profile Image NFT Claim coming soon...
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleEditUserProfile)}
              className="w-full space-y-4"
            >
              {(["name", "description", "email"] as const).map(field => (
                <FormField
                  key={field}
                  control={form.control}
                  name={field}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value || ""}
                          ref={ref}
                          className="bg-slate-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="submit"
                className={cn(
                  "relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-red-500 px-4 font-medium shadow-input hover:cursor-pointer hover:bg-red-700",
                  "transition duration-100 ease-in-out focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-1",
                )}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isUpdating ? "Updating..." : "Loading..."}
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(UserInfoEditModal);
