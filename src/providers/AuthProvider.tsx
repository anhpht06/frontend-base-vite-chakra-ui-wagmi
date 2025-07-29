import { SignMessageModal } from "@/components/modals/sign-message-modal";
import { toaster } from "@/components/ui/toaster";
import { useLogin, useLogout } from "@/hook/useAuth";
import { useGetMe } from "@/hook/useUser";
import { showErrorToast } from "@/shared/utils/toast";
import { useAuthStore } from "@/stores/useAuth";
import { useUserStore } from "@/stores/useUser";
import { useEffect, useState, type ReactNode } from "react";
import { useAccount, useSignMessage } from "wagmi";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isSigned, setIsSigned] = useState<boolean>(false);
  const [isConnectingWallet, setIsConnectingWallet] = useState<boolean>(false);

  const { accessToken } = useAuthStore();
  const { user, setUser } = useUserStore();

  const { address: walletAddress, isConnected, isConnecting } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const { mutateAsync: login } = useLogin();
  const { mutateAsync: logout } = useLogout();
  const { mutateAsync: getMe } = useGetMe();

  useEffect(() => {
    if (isConnecting) {
      setIsConnectingWallet(true);
    }
  }, [isConnecting]);

  useEffect(() => {
    if (!isConnectingWallet) {
      return;
    }
    if (!isConnected || !walletAddress) {
      setIsSigned(false);
      if (accessToken) {
        logout();
        return;
      }
      return;
    }

    if (isConnected && accessToken) {
      if (user) return;
      getMe()
        .then((user) => {
          setUser(user);
        })
        .catch(async () => {
          logout();
          toaster.create({
            description: "Please reconnect!",
            type: "warning",
            meta: {
              closable: true,
              showProgress: true,
            },
          });
        });
    }
    if (isConnected && !accessToken) {
      handleLogin();
    }
  }, [isConnected, accessToken]);

  async function handleLogin() {
    if (!signMessageAsync || !isConnected || !walletAddress) {
      showErrorToast(
        "Wallet is not connected or does not support signMessage."
      );
      return;
    }
    try {
      setIsSigned(true);
      const message = "Please sign this message to login";
      const signature = await signMessageAsync({ message });
      await login({
        walletAddress,
        signature,
      }).catch(() => {
        throw new Error("LOGIN_FAILED");
      });
    } catch (err) {
      const error = err as Error;
      switch (error.message) {
        case "SIGN_FAILED":
          showErrorToast("Failed to sign the message.");
          break;
        case "LOGIN_FAILED":
          showErrorToast("Login failed.");
          break;
      }
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
