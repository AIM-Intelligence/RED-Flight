import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/Form';
import { cn } from '@/lib/utils';
import { useUpdateUser } from '@/hooks/user/useUpdateUser';
import { useModal } from '@/store/use-modal-store';
import { Input } from '../ui/AnimateButton';
import { Button } from '../ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/Dialog';
import { ImageUpload } from './_components/ImageUpload';

const formSchema = z.object({
  name: z.string().max(20, 'Name must be 20 characters or less').nullable(),
  description: z
    .string()
    .max(100, 'Description must be 100 characters or less')
    .nullable(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .nullable()
    .or(z.literal(''))
    .transform((val) => (val === '' ? null : val)),
});

type FormValues = z.infer<typeof formSchema>;

const UserInfoEditModal: React.FC = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { updateUser, isUpdating } = useUpdateUser();
  const isModalOpen = isOpen && type === 'showUserInfoEdit';

  const user_info = data?.user_info || null;

  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = useMemo(
    () => ({
      name: user_info?.name ?? null,
      description: user_info?.description ?? null,
      email: user_info?.email ?? null,
    }),
    [user_info]
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!selectedImageFile) {
      setImageBase64(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImageBase64(event.target.result as string);
      }
    };
    reader.readAsDataURL(selectedImageFile);
  }, [selectedImageFile]);

  React.useEffect(() => {
    if (user_info) {
      form.reset({
        name: user_info.name ?? null,
        description: user_info.description ?? null,
        email: user_info.email ?? null,
      });
    }
  }, [user_info, form]);

  const handleEditUserProfile = useCallback(
    async (values: FormValues) => {
      if (!user_info) return;

      const hasChanges =
        Object.keys(values).some(
          (key) =>
            values[key as keyof FormValues] !==
            defaultValues[key as keyof FormValues]
        ) || selectedImageFile !== null;

      if (!hasChanges) {
        console.log('No changes made');
        return onClose();
      }

      setIsSubmitting(true);
      try {
        await updateUser({
          ...values,
          imageUrl: selectedImageFile ? null : user_info.image_url,
          imageBase64,
          fileName: selectedImageFile?.name,
          mimeType: selectedImageFile?.type,
        });

        // Close modal on successful update
        onClose();
      } catch (error) {
        console.error('Failed to update profile:', error);
        // Modal stays open on error so user can try again
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      user_info,
      defaultValues,
      updateUser,
      onClose,
      selectedImageFile,
      imageBase64,
    ]
  );

  if (!isModalOpen) {
    return null;
  }

  if (!user_info) {
    return (
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="border-red-600 bg-black text-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User Information</DialogTitle>
          </DialogHeader>
          <div className="mt-5 flex w-full items-center justify-center">
            <p>User information not available. Please try again later.</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="border-red-600 bg-black text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User Information</DialogTitle>
        </DialogHeader>
        <div className="mt-5 flex w-full flex-col items-center justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleEditUserProfile)}
              className="w-full space-y-4"
            >
              <ImageUpload
                currentImageUrl={user_info.image_url}
                onImageChange={setSelectedImageFile}
              />
              {(['name', 'description', 'email'] as const).map((field) => (
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
                          value={value || ''}
                          ref={ref}
                          className="border border-white/20 bg-slate-800 text-white transition-all duration-300 ease-in-out placeholder:text-gray-500 hover:border-red-600/50 focus:border-transparent focus:ring-2 focus:ring-red-600"
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
                  'relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-red-600 px-4 font-medium shadow-input hover:cursor-pointer hover:bg-red-700',
                  'transition duration-100 ease-in-out focus:outline-none focus:ring-1 focus:ring-red-600 focus:ring-offset-1'
                )}
                disabled={isUpdating || isSubmitting}
              >
                {isUpdating || isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Submit'
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
