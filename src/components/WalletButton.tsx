import { useWallet } from '../hooks/useWallet';
import './WalletButton.css';

export function WalletButton() {
  const { isConnected, isLoading, connectWallet, disconnectWallet, error } = useWallet();

  const handleClick = () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  return (
    <div className="wallet-button-container">
      <button 
        className={`wallet-button ${isConnected ? 'connected' : 'disconnected'}`}
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="loading-spinner">⟳</span>
        ) : isConnected ? (
          'Disconnect Wallet'
        ) : (
          'Connect Wallet'
        )}
      </button>
      
      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {error.message}
        </div>
      )}
    </div>
  );
}