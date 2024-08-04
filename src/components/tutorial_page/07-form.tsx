"use client";

import { useContext, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@supabase/supabase-js";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useForm } from "react-hook-form";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/InputOtp";
import { MessagesContext } from "@/context/Messages";
import { client } from "@/lib/client";
import useNFTStore from "@/store/tutorial-nft-store";
import { useCount } from "@/store/tutorial-store";
import { chain } from "@/utils/chain";

// Supabase 클라이언트 초기화
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Password must be 6 characters.",
  }),
});

function calculateUserMessageLength(conversation: any[]) {
  return conversation
    .filter(message => message.isUserMessage)
    .reduce((total, message) => total + message.text.length, 0);
}

export function InputPassword({
  difficulty,
}: {
  difficulty: "easy" | "normal" | "hard" | "impossible";
}) {
  const activeAccount = useActiveAccount();
  const { increment } = useCount();
  const [isInvalid, setIsInvalid] = useState(false);
  const { updateNFT } = useNFTStore.getState();
  const { messages } = useContext(MessagesContext);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const difficultyMap = {
    easy: 1,
    normal: 2,
    hard: 3,
    impossible: 4,
  };

  const updateUserData = async () => {
    if (!activeAccount?.address) return;
    const difficultyLevel = difficultyMap[difficulty];

    try {
      // Check User in DB
      const { data: existingUser, error: fetchError } = await supabase
        .from("User")
        .select("*")
        .eq("address", activeAccount.address)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        throw fetchError;
      }

      let updateColumn;

      switch (difficultyLevel) {
        case 1:
          updateColumn = "easy";
          break;
        case 2:
          updateColumn = "normal";
          break;
        case 3:
          updateColumn = "hard";
          break;
        case 4:
          updateColumn = "impossible";
          break;
        default:
          console.error("Invalid difficulty level");
          return;
      }

      if (!existingUser) {
        // Create new User
        const { error: insertError } = await supabase
          .from("User")
          .insert({ address: activeAccount.address, tutorial: true });

        if (insertError) throw insertError;

        const { error: updateError } = await supabase.rpc(
          "increment_difficulty",
          {
            address_arg: activeAccount.address,
            column_name: updateColumn,
          },
        );

        if (updateError) throw updateError;
      }

      const { error: updateError } = await supabase.rpc(
        "increment_difficulty",
        {
          address_arg: activeAccount.address,
          column_name: updateColumn,
        },
      );

      if (updateError) throw updateError;

      // Score Update
      const scoreMap = { easy: 10, normal: 200, hard: 500, impossible: 1000 };
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
    console.log("messages", messages);

    updateNFT({
      story: "Demo",
      difficulty: difficultyMap[difficulty],
      conversation: messages.length,
      length: calculateUserMessageLength(messages),
      target: "Nanobytes",
    });

    //! DB 에 저장하기 => 그리고 Mint에 적용하기

    const passwords = {
      easy: process.env.NEXT_PUBLIC_DEMO_EASY,
      normal: process.env.NEXT_PUBLIC_DEMO_NORMAL,
      hard: process.env.NEXT_PUBLIC_DEMO_HARD,
      impossible: process.env.NEXT_PUBLIC_DEMO_IMPOSSIBLE,
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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full items-center"
          >
            <FormField
              control={form.control}
              name="pin"
              disabled={!difficulty}
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
                            className={`rounded-lg border-2 text-center text-xl transition duration-200 focus:outline-none ${
                              isInvalid
                                ? "border-red-500 bg-red-700"
                                : "border-red-500 focus:border-red-700 focus:shadow-lg focus:ring-2 focus:ring-red-500"
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
