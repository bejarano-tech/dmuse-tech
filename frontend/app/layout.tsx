"use client"
import { UseInkProvider } from "useink";
import "./globals.css";
import { Inter } from "next/font/google";
import { AlephTestnet, RococoContractsTestnet, ShibuyaTestnet } from "useink/chains";
import { DMuseContractProvider } from "@/context";
import DMuseAudio, { DMuseAudioProvider } from "@/components/DMuseAudio";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

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
            chains: [AlephTestnet],
          }}
        >
          <DMuseContractProvider>
            <DMuseAudioProvider>
              <>
                <Header />
                {children}
                <DMuseAudio />
              </>
            </DMuseAudioProvider>
          </DMuseContractProvider>
        </UseInkProvider>
      </body>
    </html>
  );
}
