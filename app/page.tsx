import ClapButton from '@/components/ClapButton';
import DedicateButton from '@/components/DedicateButton';
import SongsList from '@/components/SongsList';
import WalletConnection from '@/components/WalletConnection';
import Image from 'next/image'

export default function Home() {
  const songs = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    name: `Song Name ${i + 1}`,
    image: `https://random.imagecdn.app/328/261?w=3840&q=75`,
    artist: `Artist Name ${i + 1}`
  }));

  return (
    <div className="font-sans">
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
            </div>
            <p className="text-sm">
              Connect your wallet to dedicate a NFT Song
            </p>
            {/* <p className="text-sm">Example text...</p> */}
          </div>
        </div>
        <div
          className="lg:w-2/3 lg:pr-4 pb-4 lg:pb-0"
          style={{ maxHeight: "calc(100vh - 4rem)" }}
        >
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
            <SongsList songs={songs}/>
          </div>
        </div>
      </div>
    </div>
  );
}
