"use client";
import ClapButton from '@/components/ClapButton';
import DedicateButton from '@/components/DedicateButton';
import SongsList from '@/components/SongsList';
import WalletConnection from '@/components/WalletConnection';
import Image from 'next/image'
import { songs } from '@/data/songs'
import { useWallet } from 'useink';

export default function Home() {
  const { account } = useWallet()

  return (
    <div className="font-sans mb-16">
      <header className="p-4 flex justify-start">
        {/* <button className="bg-yellow-500 text-black font-bold rounded px-4 py-2">Connect Wallet</button> */}
      </header>

      <div className="lg:flex p-4">
        <div className="lg:w-1/3 lg:fixed lg:top-28 lg:right-0">
          <Image
            className="relative m-auto mb-16"
            src="/dmuse.svg"
            alt="Next.js Logo"
            width={265.12}
            height={60}
            // priority
          />
          <h1 className="text-5xl text-center mb-16 mx-16">
            Give a Dedicated NFT Song
          </h1>
          <div className="text-center mb-16">
            <div className="mb-16">
              <WalletConnection />
              <p className='mt-8'>Aleph Zero Testnet</p>
            </div>
            { !account ? 
              <p className="text-sm">
              Connect your wallet to dedicate a NFT Song
            </p>: null }
            {/* <p className="text-sm">Example text...</p> */}
          </div>
        </div>
        <div
          className="lg:w-2/3 lg:pr-4 pb-4 lg:pb-0"
        >
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
            <SongsList songs={songs}/>
          </div>
        </div>
      </div>
    </div>
  );
}
