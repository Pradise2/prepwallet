import { useWallet } from '../hooks/useWallet';
import { useState } from 'react';
import './WalletInfo.css';

export function WalletInfo() {

  const {
    isConnected,
    address,
    balance,
    chainId,
    isLoading,
    updateBalance,
    clearError,
  } = useWallet();
  const [refreshMsg, setRefreshMsg] = useState<string | null>(null);

  const handleRefresh = async () => {
    await updateBalance();
    setRefreshMsg('Balance refreshed!');
    setTimeout(() => setRefreshMsg(null), 2000);
  };

  if (!isConnected) {
    return null;
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatBalance = (bal: string | null) => {
    if (!bal) return '0.000';
    const num = parseFloat(bal);
    return num.toFixed(6);
  };

  const getNetworkName = (id: number | null) => {
    switch (id) {
      case 1: return 'Ethereum';
      case 137: return 'Polygon';
      case 8453: return 'Base';
      case 42161: return 'Arbitrum';
      case 10: return 'Optimism';
      default: return `Chain ${id}`;
    }
  };

  return (
    <div className="wallet-info">
      <h3 className="wallet-info-title">Wallet Connected</h3>
      
      <div className="wallet-info-grid">
        <div className="info-item">
          <label>Address:</label>
          <span className="address" title={address || ''}>
            {address ? formatAddress(address) : 'Unknown'}
          </span>
        </div>
        
        <div className="info-item">
          <label>Balance:</label>
          <div className="balance-container">
            <span className="balance" aria-live="polite">
              {isLoading ? (
                <span className="loading-spinner" aria-label="Loading">...</span>
              ) : `${formatBalance(balance)} ETH`}
            </span>
            <button
              className="refresh-button"
              onClick={handleRefresh}
              disabled={isLoading}
              title="Refresh balance"
              aria-label="Refresh balance"
              tabIndex={0}
            >
              ⟳
            </button>
          </div>
        </div>
        
        <div className="info-item">
          <label>Network:</label>
          <span className="network">
            {getNetworkName(chainId)}
          </span>
        </div>
      </div>

      {refreshMsg && (
        <div className="success-message" role="status" aria-live="polite">
          <span className="success-icon" aria-hidden="true">✅</span>
          {refreshMsg}
        </div>
      )}

      <button className="clear-error-button" onClick={clearError} aria-label="Clear error messages" tabIndex={0}>
        Clear Errors
      </button>
    </div>
  );
}