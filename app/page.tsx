"use client";

import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { COMMUNITY_NAME } from "../lib/constants";

export default function Home() {
  const { connected } = useWallet();

  return (
    <div className="flex min-h-[calc(100vh-96px)] flex-col items-center justify-center px-6 text-center">
      <div className="space-y-6 max-w-xl">
        <h1 className="text-4xl font-semibold text-white sm:text-5xl">
          Welcome to the {COMMUNITY_NAME} hub
        </h1>
        <p className="text-slate-300">
          Connect your wallet to verify membership and access exclusive content, updates, and gated
          perks. Use the quickstart docs in this template to wire your SPL token mint or NFT
          collection.
        </p>
        <div className="flex flex-col items-center gap-4">
          <WalletMultiButton className="bg-solana px-6 py-2 text-sm font-medium text-white" />
          {connected && (
            <Link
              className="text-solana transition hover:text-solana-dark"
              href="/member"
            >
              Enter member area →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
