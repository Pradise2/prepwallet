export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  chainId: number | null;
  isLoading: boolean;
  error: string | null;
}

export interface NetworkInfo {
  id: number;
  name: string;
  symbol: string;
  rpcUrl: string;
  blockExplorer: string;
}

export interface TransactionData {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
}

export interface AppError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface EnvironmentConfig {
  PROJECT_ID: string;
  APP_NAME: string;
  APP_URL: string;
  ENABLE_ANALYTICS: boolean;
}