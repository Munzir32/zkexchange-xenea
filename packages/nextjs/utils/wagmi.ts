// 'use client'
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { eip712WalletActions } from "viem/zksync";
import { zkSyncSepoliaTestnet } from "wagmi/chains";

const [account] =
  typeof window !== "undefined" && window.ethereum
    ? await window.ethereum.request({ method: "eth_requestAccounts" })
    : [];
// if (!account) {
//   throw new Error("No account found. Please connect your wallet."); // Throw an error if no account is found
// }
export const walletClient =
  typeof window !== "undefined" && window.ethereum
    ? 
      createWalletClient({
        account,
        chain: zkSyncSepoliaTestnet, 
        transport: custom(window?.ethereum), 
      }).extend(eip712WalletActions()) : null;

export const publicClient = createPublicClient({
  chain: zkSyncSepoliaTestnet, 
  transport: http(), 
});
