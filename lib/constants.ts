export const COMMUNITY_NAME = process.env.NEXT_PUBLIC_COMMUNITY_NAME ?? "Lili Members";
export const REQUIRED_MINT = process.env.NEXT_PUBLIC_REQUIRED_MINT ?? "TokenMintPublicKey";
const parsedDecimals = Number(process.env.NEXT_PUBLIC_REQUIRED_DECIMALS ?? "0");
const parsedBalance = Number(process.env.NEXT_PUBLIC_REQUIRED_BALANCE ?? "1");

export const REQUIRED_DECIMALS = Number.isFinite(parsedDecimals) ? parsedDecimals : 0;
export const REQUIRED_BALANCE = Number.isFinite(parsedBalance) ? parsedBalance : 1;
