import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router";
import { Provider } from "./components/ui/provider";
import { ColorModeProvider } from "./components/ui/color-mode";
import { WalletProvider } from "./providers/WagmiProvider";
import "@rainbow-me/rainbowkit/styles.css";
import { AuthProvider } from "./providers/AuthProvider";
import { Toaster } from "./components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <WalletProvider>
    <Provider>
      <ColorModeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster />
        </AuthProvider>
      </ColorModeProvider>
    </Provider>
  </WalletProvider>
);
