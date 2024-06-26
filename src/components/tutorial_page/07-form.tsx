"use client";
import { useState } from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useCount } from "@/store/tutorial_store";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createClient } from "@supabase/supabase-js";
import { client } from "@/lib/client";
import { chain } from "@/utils/chain";

// Supabase 클라이언트 초기화
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Password must be 6 characters.",
  }),
});

export function InputPassword({ difficulty }: { difficulty: "easy" | "normal" | "hard" | "impossible" }) {
  const activeAccount = useActiveAccount();
  const { increment } = useCount();
  const [isInvalid, setIsInvalid] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const updateUserData = async () => {
    if (!activeAccount?.address) return;

    try {
      // 사용자 확인 또는 생성
      const { data: existingUser, error: fetchError } = await supabase
        .from("User")
        .select("*")
        .eq("address", activeAccount.address)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        throw fetchError;
      }

      if (!existingUser) {
        // 새 사용자 생성
        const { error: insertError } = await supabase
          .from("User")
          .insert({ address: activeAccount.address, tutorial: true });

        if (insertError) throw insertError;
      } else {
        // 기존 사용자 업데이트
        const { error: updateError } = await supabase
          .from("User")
          .update({ tutorial: true })
          .eq("address", activeAccount.address);

        if (updateError) throw updateError;
      }

      // 점수 업데이트
      const scoreMap = { easy: 10, normal: 30, hard: 50, impossible: 100 };
      const scoreToAdd = scoreMap[difficulty];

      const { error: scoreError } = await supabase.rpc("increment_score", {
        address_arg: activeAccount.address,
        score_increment: scoreToAdd,
      });

      if (scoreError) throw scoreError;
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const passwords = {
      easy: "zaion9",
      normal: "1Ethan",
      hard: "REDSKY",
      impossible: "1CARU5",
    };

    if (data.pin !== passwords[difficulty]) {
      setIsInvalid(true);
      setTimeout(() => setIsInvalid(false), 1000);
    } else {
      await updateUserData();
      increment();
    }
  }

  return (
    <>
      {activeAccount?.address ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex items-center">
            <FormField
              control={form.control}
              name="pin"
              disabled={!difficulty}
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
                            className={`border-2 rounded-lg text-center text-xl focus:outline-none transition duration-200 ${
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
          </form>
        </Form>
      ) : (
        <ConnectButton
          appMetadata={{
            name: "RED Flight",
            url: "https://www.redflight.io",
          }}
          client={client}
          chain={chain}
        />
      )}
    </>
  );
}
