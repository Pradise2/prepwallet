import { useWallet } from '../hooks/useWallet';
import './WalletButton.css';


import { useRef, useState, useEffect } from 'react';

export function WalletButton() {
  const { isConnected, isLoading, connectWallet, disconnectWallet, error } = useWallet();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isConnected) {
      setSuccessMsg('Wallet connected successfully!');
      setTimeout(() => setSuccessMsg(null), 2000);
    }
  }, [isConnected]);

  const handleClick = () => {
    if (isConnected) {
      disconnectWallet();
      setSuccessMsg('Wallet disconnected.');
      setTimeout(() => setSuccessMsg(null), 2000);
    } else {
      connectWallet();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  };

  return (
    <div className="wallet-button-container">
      <button
        ref={buttonRef}
        className={`wallet-button ${isConnected ? 'connected' : 'disconnected'}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        aria-busy={isLoading}
        aria-live="polite"
        aria-label={isConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
        tabIndex={0}
      >
        {isLoading ? (
          <span className="loading-spinner" aria-label="Loading">⟳</span>
        ) : isConnected ? (
          'Disconnect Wallet'
        ) : (
          'Connect Wallet'
        )}
      </button>

      {successMsg && (
        <div className="success-message" role="status" aria-live="polite">
          <span className="success-icon" aria-hidden="true">✅</span>
          {successMsg}
        </div>
      )}

      {error && (
        <div className="error-message" role="alert" aria-live="assertive">
          <span className="error-icon">⚠️</span>
          {error.message}
        </div>
      )}
    </div>
  );
}