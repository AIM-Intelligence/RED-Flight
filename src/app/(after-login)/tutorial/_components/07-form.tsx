import React, { useContext } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/Form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/InputOtp';
import { MessagesContext } from '@/context/Messages';
import { useWeb3User } from '@/hooks/user/useSignIn';
import { useCount } from '@/store/tutorial-store';

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: 'Password must be 6 characters.',
  }),
});

export function InputPassword() {
  const queryClient = useQueryClient();
  const { codeFound } = useContext(MessagesContext);
  const { increment } = useCount();
  const { refreshUser } = useWeb3User();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('messages', data);
    queryClient.invalidateQueries({ queryKey: ['userPrompts'] });
    refreshUser();
    increment();
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {codeFound && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute -top-12 left-0 right-0 mb-6 text-center"
          >
            <p className="text-xl font-bold text-green-500">
              Password entry is enabled.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full items-center"
        >
          <FormField
            control={form.control}
            name="pin"
            disabled={!codeFound}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    {...field}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  >
                    <p className="text-2xl text-white">Code :</p>
                    <InputOTPGroup className="gap-2">
                      {[...Array(6)].map((_, index) => (
                        <motion.div
                          key={index}
                          initial={false}
                          animate={codeFound ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 0.3 }}
                        >
                          <InputOTPSlot
                            index={index}
                            className="rounded-lg border-2 border-red-500 text-center text-xl transition duration-200 focus:border-red-700 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                        </motion.div>
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
