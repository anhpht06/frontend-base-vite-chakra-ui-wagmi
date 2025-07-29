import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router";
import { Provider } from "./components/ui/provider";
import { ColorModeProvider } from "./components/ui/color-mode";
import { WalletProvider } from "./providers/WagmiProvider";
import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "./components/ui/toaster";
import { Suspense } from "react";
import Loading from "./components/PageLoading";

createRoot(document.getElementById("root")!).render(
  <WalletProvider>
    <Provider>
      <ColorModeProvider>
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
        <Toaster />
      </ColorModeProvider>
    </Provider>
  </WalletProvider>
);
