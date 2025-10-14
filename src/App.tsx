import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary';
import { WalletButton } from './components/WalletButton';
import { WalletInfo } from './components/WalletInfo';

function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">PrepWallet</h1>
          <p className="app-subtitle">Your secure crypto wallet interface</p>
        </header>

        <main className="app-main">
          <WalletButton />
          <WalletInfo />
        </main>

        <footer className="app-footer">
          <p>Built with modern web3 technologies</p>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
