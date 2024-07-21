import { useTonConnectUI } from '@tonconnect/ui-react';

export function useTonConnect() {
  const [tonConnectUI] = useTonConnectUI();

  return {
    connected: tonConnectUI.connected,
    wallet: tonConnectUI.account,
    balance: tonConnectUI.account?.balance,
    connectWallet: async () => {
      if (tonConnectUI.connected) {
        return; // Already connected
      }
      try {
        await tonConnectUI.connectWallet();
      } catch (e) {
        console.error(e);
        throw new Error('Failed to connect wallet');
      }
    },
    disconnectWallet: () => tonConnectUI.disconnect(),
  };
}