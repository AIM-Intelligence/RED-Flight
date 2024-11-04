import { defineChain } from "thirdweb";

//const zetaT = defineChain(7001);
//const mantaT = defineChain(3441006);
const sepolia = defineChain(11155111);
const ether = defineChain(1);
const near = defineChain(397);
//const kaiaT = defineChain(1001);
//const zkSyncT = defineChain(300);
//const coreT = defineChain(1115);
//const theta = defineChain(365);

export const chainList = [near, ether, sepolia];

export const chain = defineChain(3441006);
