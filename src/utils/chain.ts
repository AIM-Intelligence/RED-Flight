import { defineChain } from "thirdweb";

const zetaT = defineChain(7001);
const mantaT = defineChain(3441006);
const zkSyncT = defineChain(300);
const coreT = defineChain(1115);
const theta = defineChain(365);

const chainList = [zetaT, mantaT, zkSyncT, coreT, theta];
export default chainList;

export const chain = defineChain(3441006);
