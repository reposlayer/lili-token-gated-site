"use client";

import { useCallback, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { GateCheckResult, checkAccess } from "../../lib/gating";
import { COMMUNITY_NAME, REQUIRED_MINT } from "../../lib/constants";

export default function MemberPage() {
  const { publicKey } = useWallet();
  const [state, setState] = useState<{
    loading: boolean;
    result?: GateCheckResult;
    error?: string;
  }>({ loading: false });

  const runGateCheck = useCallback(async () => {
    if (!publicKey) {
      setState({ loading: false, error: "Connect your wallet" });
      return;
    }

    setState({ loading: true });

    try {
      const result = await checkAccess({ owner: publicKey.toBase58(), mint: REQUIRED_MINT });
      setState({ loading: false, result });
    } catch (error: unknown) {
      setState({ loading: false, error: error instanceof Error ? error.message : String(error) });
    }
  }, [publicKey]);

  useEffect(() => {
    runGateCheck();
  }, [runGateCheck]);

  if (!publicKey) {
    return (
      <div className="flex min-h-[calc(100vh-96px)] items-center justify-center">
        <p className="text-slate-300">Connect your wallet to continue.</p>
      </div>
    );
  }

  if (state.loading) {
    return (
      <div className="flex min-h-[calc(100vh-96px)] items-center justify-center">
        <p className="animate-pulse text-slate-300">Checking access…</p>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="flex min-h-[calc(100vh-96px)] items-center justify-center">
        <div className="max-w-md space-y-3 rounded-lg border border-red-500/40 bg-red-500/10 p-6 text-left">
          <h2 className="text-xl font-semibold text-white">Unable to verify membership</h2>
          <p className="text-slate-300">{state.error}</p>
          <button
            className="rounded bg-solana px-4 py-2 text-sm font-medium text-white"
            onClick={runGateCheck}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!state.result?.hasAccess) {
    return (
      <div className="flex min-h-[calc(100vh-96px)] items-center justify-center">
        <div className="max-w-md space-y-3 rounded-lg border border-orange-400/40 bg-orange-500/10 p-6 text-left">
          <h2 className="text-xl font-semibold text-white">Membership required</h2>
          <p className="text-slate-300">
            This area is restricted to holders of mint <span className="font-mono">{REQUIRED_MINT}</span>.
          </p>
          <p className="text-slate-400">Balance detected: {state.result?.balance ?? 0}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-96px)] max-w-4xl flex-col gap-6 px-6 py-10">
      <div>
        <h1 className="text-3xl font-semibold text-white">Welcome to {COMMUNITY_NAME}</h1>
        <p className="mt-2 text-slate-300">
          This is your secure members area. Wire real content here: announcements, gated downloads,
          governance dashboards, or anything your community needs.
        </p>
      </div>
      <section className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-lg border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold text-white">Latest drop</h2>
          <p className="mt-2 text-sm text-slate-300">
            Showcase your latest gated NFT drop or link out to a mint experience.
          </p>
        </article>
        <article className="rounded-lg border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold text-white">Member tools</h2>
          <p className="mt-2 text-sm text-slate-300">
            Link to governance, chat, analytics dashboards or custom tools tailored to your
            community.
          </p>
        </article>
      </section>
    </div>
  );
}
