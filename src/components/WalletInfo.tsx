import { useWallet } from '../hooks/useWallet';
import './WalletInfo.css';

export function WalletInfo() {
  const { 
    isConnected, 
    address, 
    balance, 
    chainId, 
    isLoading, 
    updateBalance,
    clearError 
  } = useWallet();

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
            <span className="balance">
              {isLoading ? '...' : `${formatBalance(balance)} ETH`}
            </span>
            <button 
              className="refresh-button"
              onClick={updateBalance}
              disabled={isLoading}
              title="Refresh balance"
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

      <button className="clear-error-button" onClick={clearError}>
        Clear Errors
      </button>
    </div>
  );
}