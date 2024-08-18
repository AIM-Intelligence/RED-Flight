"use client";

import { useContext } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/InputOtp";
import { MessagesContext } from "@/context/Messages";
import { useCount } from "@/store/tutorial-store";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Password must be 6 characters.",
  }),
});

export function InputPassword() {
  const { codeFound } = useContext(MessagesContext);
  const { increment } = useCount();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("messages", data);
    increment();
  }

  return (
    <>
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
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className="rounded-lg border-2 border-red-500 text-center text-xl transition duration-200 focus:border-red-700 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
}
