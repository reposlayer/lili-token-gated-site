import { Connection, PublicKey } from "@solana/web3.js";

export type GateCheckResult = {
  hasAccess: boolean;
  balance: number;
  requiredMint: string;
};

export async function checkAccess({
  owner,
  mint,
  rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC ?? "https://api.devnet.solana.com"
}: {
  owner: string;
  mint: string;
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

  return {
    hasAccess: balance > 0,
    balance,
    requiredMint: mint
  };
}
