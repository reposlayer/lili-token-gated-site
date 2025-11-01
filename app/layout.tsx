import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SolanaProviders } from "../components/SolanaProviders";

export const metadata: Metadata = {
  title: "Token-Gated Members Portal",
  description: "Starter template for a Solana SPL token-gated site built with Next.js 14"
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-slate-100">
        <SolanaProviders>{children}</SolanaProviders>
      </body>
    </html>
  );
}
