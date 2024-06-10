"use client";
import { client } from "@/lib/client";
import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { Button } from "../ui/button";

import { ConnectButton, useActiveAccount, useSendTransaction } from "thirdweb/react";

import { prepareContractCall, resolveMethod } from "thirdweb";

const GetToken = () => {
  const contract = getContract({
    client,
    chain: defineChain(3441006),
    address: "0x266dda99408e839446E2b9B4d3D872A6B5FA0d8d",
  });

  const activeAccount = useActiveAccount();

  const { mutate: sendTransaction, isPending, isError, isSuccess } = useSendTransaction();

  console.log("activeAccount?.address", activeAccount?.address);

  const call = async () => {
    const transaction = await prepareContractCall({
      contract,
      method: resolveMethod("transfer"),
      params: ["0xfE079EeC384A93457233720C76961EAC523897A0", "10000000000000000000"], // 10 ETH in wei
    });
    await sendTransaction(transaction);
  };

  if (!activeAccount?.address) {
    return (
      <ConnectButton
        appMetadata={{
          name: "RED Flight",
          url: "https://red-flight.vercel.app",
        }}
        client={client}
      />
    );
  }

  return (
    <Button disabled={isPending} onClick={call} className="border border-red-600">
      {isSuccess
        ? "You are RED Flight Pioneer"
        : isPending
          ? "Loading..."
          : isError
            ? "Decline"
            : "Get RED Fuel Token & Enroll your address"}
    </Button>
  );
};

export default GetToken;
