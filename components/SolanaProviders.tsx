"use client";

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from "@solana/wallet-adapter-react-ui";
import { useMemo, type ReactNode } from "react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";

import "@solana/wallet-adapter-react-ui/styles.css";

const DEFAULT_RPC = process.env.NEXT_PUBLIC_SOLANA_RPC ?? "https://api.devnet.solana.com";

export function SolanaProviders({ children }: { children: ReactNode }) {
  const endpoint = useMemo(() => DEFAULT_RPC, []);
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter({ network: WalletAdapterNetwork.Devnet })],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint} config={{ commitment: "confirmed" }}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="relative flex min-h-screen flex-col">
            <header className="flex items-center justify-between px-6 py-4">
              <div className="text-lg font-semibold text-white">Lili Members</div>
              <div className="flex items-center gap-2">
                <WalletMultiButton className="rounded-md bg-solana px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:bg-solana-dark" />
                <WalletDisconnectButton className="rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:border-white/40" />
              </div>
            </header>
            <main className="flex-1">{children}</main>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
