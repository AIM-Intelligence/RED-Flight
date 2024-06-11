"use client";
import { client } from "@/lib/client";
import { Button } from "../ui/button";

import { ConnectButton, useActiveAccount } from "thirdweb/react";

const GetToken = () => {
  const activeAccount = useActiveAccount();

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

  return <Button className="border cursor-not-allowed border-red-600">Thanks Red Flight</Button>;
};

export default GetToken;
