import { useState, useEffect, useCallback } from 'react';
import { useAppKit, useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react';
import type { WalletState, AppError } from '../types';
import { getEthBalance } from '../utils/balance';

export function useWallet() {
  const { open, close } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
  
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,
    chainId: null,
    isLoading: false,
    error: null,
  });

  const [error, setError] = useState<AppError | null>(null);

  const clearError = useCallback(() => {
    setError(null);
    setWalletState(prev => ({ ...prev, error: null }));
  }, []);

  const handleError = useCallback((error: unknown, code: string = 'WALLET_ERROR') => {
    const appError: AppError = {
      code,
      message: error instanceof Error ? error.message : 'An unknown error occurred',
      details: error instanceof Error ? { stack: error.stack } : { error }
    };
    
    console.error(`Wallet Error [${code}]:`, appError);
    setError(appError);
    setWalletState(prev => ({ ...prev, error: appError.message, isLoading: false }));
  }, []);

  const updateBalance = useCallback(async () => {
    if (!address) return;
    
    setWalletState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const balance = await getEthBalance(address);
      setWalletState(prev => ({ 
        ...prev, 
        balance, 
        isLoading: false,
        error: null 
      }));
    } catch (err) {
      handleError(err, 'BALANCE_FETCH_ERROR');
    }
  }, [address, handleError]);

  const connectWallet = useCallback(async () => {
    try {
      setWalletState(prev => ({ ...prev, isLoading: true }));
      clearError();
      await open();
    } catch (err) {
      handleError(err, 'CONNECTION_ERROR');
    }
  }, [open, clearError, handleError]);

  const disconnectWallet = useCallback(async () => {
    try {
      await close();
      setWalletState({
        isConnected: false,
        address: null,
        balance: null,
        chainId: null,
        isLoading: false,
        error: null,
      });
      clearError();
    } catch (err) {
      handleError(err, 'DISCONNECTION_ERROR');
    }
  }, [close, clearError, handleError]);

  // Update wallet state when connection status changes
  useEffect(() => {
    setWalletState(prev => ({
      ...prev,
      isConnected: isConnected || false,
      address: address || null,
      chainId: typeof chainId === 'number' ? chainId : null,
    }));

    // Fetch balance when connected
    if (isConnected && address) {
      updateBalance();
    }
  }, [isConnected, address, chainId, updateBalance]);

  return {
    ...walletState,
    error,
    connectWallet,
    disconnectWallet,
    updateBalance,
    clearError,
  };
}