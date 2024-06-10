import type { Metadata } from "next";
import { Sora } from "next/font/google";
import QueryProvider from "@/lib/providers/QueryProvider";
import "./globals.css";

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
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
