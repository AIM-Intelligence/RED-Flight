import { Sora } from "next/font/google";

import "../styles/globals.css";
import type { Metadata } from "next";
import { ThirdwebProvider } from "thirdweb/react";

import { Toaster } from "@/components/ui/Toaster";
import QueryProvider from "@/lib/providers/query-provider";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Red Flight",
  description: "AI Jailbreaking NFT Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sora.className}>
        <QueryProvider>
          <ThirdwebProvider>
            {children}
            <Toaster />
          </ThirdwebProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
