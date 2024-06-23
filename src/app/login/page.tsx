import { ConnectEmbed } from "thirdweb/react";
import { client } from "@/lib/client";

const page = () => {
  return (
    <div className="flex h-full justify-center items-center">
      <ConnectEmbed client={client} />
    </div>
  );
};

export default page;
