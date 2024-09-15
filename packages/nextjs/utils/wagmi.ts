// 'use client'
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { eip712WalletActions } from "viem/zksync";
import { zkSyncSepoliaTestnet } from "wagmi/chains";

export const xenea = {
  id: 5555,
  name: 'CVC Kura',
  network: 'CVC Kura',
  nativeCurrency: {
    decimals: 18,
    name: 'CVC Kura',
    symbol: 'XCR',
  },
  rpcUrls: {
    public: { http: ['https://rpc-kura.cross.technology/'] },
    default: { http: ['https://rpc-kura.cross.technology/'] },
  },
  blockExplorers: {
    etherscan: { name: 'CVC Kura', url: 'https://testnet.crossvaluescan.com/' },
    default: { name: 'CVC Kura', url: 'https://testnet.crossvaluescan.com/' },
  },
  contracts: {
    multicall3: {
      address: '0x914e5D06d4fc0856C09aE99d47B21124a3B4bC0B',
      // blockCreated: 11_907_934,
    },
  },
} 

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
        chain: xenea, 
        transport: custom(window?.ethereum), 
      }) : null;

export const publicClient = createPublicClient({
  chain: xenea, 
  transport: http(), 
});
