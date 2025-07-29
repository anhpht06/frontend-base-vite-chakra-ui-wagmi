import { SignMessageModal } from "@/components/modals/sign-message-modal";
import { useLogin, useLogout } from "@/hook/useAuth";
import { useGetMe } from "@/hook/useUser";
import { showErrorToast, showWarningToast } from "@/shared/utils/toast";
import { useAuthStore } from "@/stores/useAuth";
import { useUserStore } from "@/stores/useUser";
import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount, useSignMessage } from "wagmi";
import { getChains, switchChain, watchAccount } from "@wagmi/core";
import { config } from "@/shared/config/wagmiConfig";
import { ROUTES } from "@/shared/constants/router";
import { signMessage } from "@/shared/constants/environment";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isSigned, setIsSigned] = useState<boolean>(false);
  const navigate = useNavigate();

  const { accessToken } = useAuthStore();
  const { user } = useUserStore();

  const { address: walletAddress, isConnected, connector } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const chains = getChains(config);
  type ValidChainId = (typeof config.chains)[number]["id"];

  const { mutateAsync: login } = useLogin();
  const { mutateAsync: logout } = useLogout();
  const { mutate: getMe } = useGetMe();

  useEffect(() => {
    if (!isConnected || !walletAddress) {
      if (accessToken) logout();
    }
  }, [isConnected, walletAddress, accessToken]);

  useEffect(() => {
    if (isConnected && walletAddress && !accessToken) {
      if (connector?.name !== "MetaMask") {
        showWarningToast("Please connect with MetaMask.");
        logout();
        return;
      }

      handleLogin();
    }
  }, [isConnected, walletAddress, accessToken]);

  useEffect(() => {
    if (isConnected && walletAddress && accessToken && !user) {
      getMe();
    }
  }, [isConnected, walletAddress, accessToken, user]);

  useEffect(() => {
    const unwatch = watchAccount(config, {
      onChange(account, prevAccount) {
        //check change wallet
        const newAddress = account.address;
        const oldAddress = prevAccount?.address;
        if (newAddress && oldAddress && newAddress !== oldAddress) {
          navigate(ROUTES.APP.HOME, { replace: true });
          showWarningToast("Wallet changed. Please login again.");
          logout();
        }

        //check change chain
        const currentChainId = account?.chainId;
        const prevChainId = prevAccount?.chainId;
        if (typeof currentChainId !== "number") return;
        const isSupported = chains.some((item) => item.id === currentChainId);
        if (!isSupported && prevChainId) {
          const wasSupported = chains.some((item) => item.id === prevChainId);

          showWarningToast(
            `🚫 The network you selected is not supported on ADIX.`
          );

          if (wasSupported) {
            switchChain(config, { chainId: prevChainId as ValidChainId });
          } else {
            switchChain(config, { chainId: chains[0].id });
          }
        }
      },
    });
    return () => {
      unwatch();
    };
  }, [accessToken, walletAddress]);

  async function handleLogin() {
    if (!signMessageAsync || !isConnected || !walletAddress) {
      showErrorToast(
        "Wallet is not connected or does not support signMessage."
      );
      return;
    }
    try {
      setIsSigned(true);
      const signature = await signMessageAsync({ message: signMessage });
      await login({
        walletAddress,
        signature,
      });
    } catch {
      logout();
    } finally {
      setIsSigned(false);
    }
  }

  return (
    <>
      {isSigned && <SignMessageModal showModal={isSigned} />}
      {children}
    </>
  );
};
