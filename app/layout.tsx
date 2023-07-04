"use client"
import { UseInkProvider } from "useink";
import "./globals.css";
import { Inter } from "next/font/google";
import { RococoContractsTestnet, ShibuyaTestnet } from "useink/chains";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UseInkProvider
          config={{
            dappName: "DMuse",
            chains: [RococoContractsTestnet, ShibuyaTestnet],
          }}
        >
          {children}
        </UseInkProvider>
      </body>
    </html>
  );
}
