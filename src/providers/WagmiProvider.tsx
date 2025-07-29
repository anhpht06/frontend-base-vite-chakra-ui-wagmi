import { config } from "@/shared/config/wagmiConfig";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { ReactNode } from "react";
import ReactQueryProvider from "./ReactQueryProvider";
import { WagmiProvider } from "wagmi";

export const WalletProvider = ({
  children,
}: {
  readonly children: ReactNode;
}) => {
  return (
    <WagmiProvider config={config}>
      <ReactQueryProvider>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </ReactQueryProvider>
    </WagmiProvider>
  );
};
