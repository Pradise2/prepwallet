import { createAppKit } from "@reown/appkit";
import {
  mainnet,
  polygon,
  base,
  solana,
  arbitrum,
  optimism,
} from "@reown/appkit/networks";
import type { AppKitNetwork } from "@reown/appkit/networks";

// Environment validation
const requiredEnvVars = {
  PROJECT_ID: import.meta.env.VITE_PROJECT_ID,
  APP_NAME: import.meta.env.VITE_APP_NAME || "PrepWallet",
  APP_URL: import.meta.env.VITE_APP_URL || "http://localhost:5173",
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === "true",
} as const;

// Validate required environment variables
if (!requiredEnvVars.PROJECT_ID) {
  throw new Error(
    "VITE_PROJECT_ID is required. Please add it to your .env file. Get your project ID from https://dashboard.reown.com"
  );
}

export const projectId = requiredEnvVars.PROJECT_ID;

// Define networks
export const networks = [
  mainnet,
  polygon,
  base,
  solana,
  arbitrum,
  optimism,
] as [AppKitNetwork, ...AppKitNetwork[]];

// Create AppKit instance with embedded wallet
export const appKit = createAppKit({
  projectId,
  networks,
  metadata: {
    name: requiredEnvVars.APP_NAME,
    description: "A modern crypto wallet application",
    url: requiredEnvVars.APP_URL,
    icons: [`${requiredEnvVars.APP_URL}/icon.png`],
  },
  features: {
    analytics: requiredEnvVars.ENABLE_ANALYTICS,
    email: false,
    socials: false,
    emailShowWallets: false,
  },
});
