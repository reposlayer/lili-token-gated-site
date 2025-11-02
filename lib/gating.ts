import { Connection, PublicKey } from "@solana/web3.js";

export type GateCheckResult = {
  hasAccess: boolean;
  balance: number;
  requiredMint: string;
  requiredBalance: number;
  decimals: number;
};

export async function checkAccess({
  owner,
  mint,
  minBalance = 0,
  decimals = 0,
  rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC ?? "https://api.devnet.solana.com"
}: {
  owner: string;
  mint: string;
  minBalance?: number;
  decimals?: number;
  rpcUrl?: string;
}): Promise<GateCheckResult> {
  const connection = new Connection(rpcUrl, "confirmed");
  const ownerKey = new PublicKey(owner);
  const mintKey = new PublicKey(mint);
  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(ownerKey, {
    mint: mintKey
  });

  const balance = tokenAccounts.value.reduce((acc, accountInfo) => {
    const data = accountInfo.account.data;
    if (data.program !== "spl-token") {
      return acc;
    }

    const parsed = data.parsed?.info;
    const amount = Number(parsed?.tokenAmount?.uiAmount) || 0;
    return acc + amount;
  }, 0);

  const threshold = Number(minBalance ?? 0);

  return {
    hasAccess: balance >= threshold,
    balance,
    requiredMint: mint,
    requiredBalance: threshold,
    decimals
  };
}
