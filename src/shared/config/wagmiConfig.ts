import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { bscTestnet } from "wagmi/chains";
import { projectId } from "../constants/environment";
import {
  injectedWallet,
  metaMaskWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

export const config = getDefaultConfig({
  appName: "amt-frontend",
  projectId: projectId,
  chains: [bscTestnet],
  wallets: [
    {
      groupName: "Recommended",
      wallets: [injectedWallet, metaMaskWallet, walletConnectWallet],
    },
  ],
  ssr: false,
  multiInjectedProviderDiscovery: false,
});
