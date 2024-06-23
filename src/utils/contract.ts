import { chain } from "./chain";
import { client } from "@/lib/client";
import { getContract } from "thirdweb";

export const nftCollectionContractAddress = "0x0265615b0Ea4Ef75d31640D96408033a85C8C584";

export const contract = getContract({
  client: client,
  chain: chain,
  address: nftCollectionContractAddress,
});
