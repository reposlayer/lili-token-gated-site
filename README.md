# Token-Gated Members Portal
    ██╗     ██╗██╗     ██╗     ██████╗██╗     ██╗
    ██║     ██║██║     ██║    ██╔════╝██║     ██║
    ██║     ██║██║     ██║    ██║     ██║     ██║
    ██║     ██║██║     ██║    ██║     ██║     ██║
    ███████╗██║███████╗██║    ╚██████╗███████╗██║
    ╚══════╝╚═╝╚══════╝╚═╝     ╚═════╝╚══════╝╚═╝
Bootstrapped with Next.js 14 App Router, Tailwind CSS, TanStack Query, and Solana wallet adapter UI. This template gives you a turnkey membership portal gated by SPL token balance.

## Features

-  Wallet connect modal with Phantom and Solflare adapters
-  Token balance gate backed by `@solana/web3.js`
-  App Router + Tailwind styling
-  Environment-driven configuration for RPC endpoint, mint address, and community name
-  Ready-to-extend members dashboard with placeholder sections

## Getting Started

```bash
pnpm install
pnpm dev
```

Set up environment variables in `.env.local`:

```env
NEXT_PUBLIC_SOLANA_RPC=https://api.devnet.solana.com
NEXT_PUBLIC_REQUIRED_MINT=TokenMintPublicKey
NEXT_PUBLIC_REQUIRED_DECIMALS=0
NEXT_PUBLIC_REQUIRED_BALANCE=1
NEXT_PUBLIC_COMMUNITY_NAME=Lili Collective
```

Then run the dev server and connect with a wallet that holds the required mint.

## Production Hardening

- Swap in your preferred RPC or a provider like Helius, Triton, or QuickNode.
- Extend `lib/gating.ts` to check metadata or delegate to your backend.
- Move gating to server actions or middleware if you need stricter enforcement.
- Add analytics, email capture, or CRM integrations inside `app/member/page.tsx`.
