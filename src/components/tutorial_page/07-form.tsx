"use client";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useState } from "react";
import { useCount } from "@/store/tutorial_store";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Password must be 6 characters.",
  }),
});

export function InputPassword() {
  const { increment } = useCount();
  const [isInvalid, setIsInvalid] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("efwf", data.pin);
    if (data.pin !== "zaion9") {
      setIsInvalid(true);
      setTimeout(() => setIsInvalid(false), 1000); // Reset after 1 second
    } else {
      increment();
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex items-center">
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP maxLength={6} {...field} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                    <p className="text-white text-2xl">Code :</p>
                    <InputOTPGroup className="gap-2">
                      {[...Array(6)].map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className={` border-2 rounded-lg text-center text-xl focus:outline-none transition duration-200 ${
                            isInvalid
                              ? "border-red-500 bg-red-700"
                              : "border-red-500 focus:border-red-700 focus:ring-2 focus:ring-red-500 focus:shadow-lg"
                          }`}
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
              </FormItem>
            )}
          />

          {/* <Button className="text-red-500 border border-red-500 h-[40px]" type="submit">
            Enter
          </Button> */}
        </form>
      </Form>
    </>
  );
}
