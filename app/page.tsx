import Image from 'next/image'

export default function Home() {
  const songs = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    name: `Song ${i + 1}`,
    image: `https://random.imagecdn.app/328/261?w=3840&q=75`,
  }));
  return (
    <div className="font-sans">
      <header className="p-4 flex justify-start">
        <button className="bg-yellow-500 text-black font-bold rounded px-4 py-2">Connect Wallet</button>
      </header>

      <div className="lg:flex p-4">
        <div className="lg:w-2/3 lg:pr-4 pb-4 lg:pb-0" style={{ maxHeight: "calc(100vh - 4rem)" }}>
          <div className="grid lg:grid-cols-3 gap-4">
              {songs.map((song) => (
                  <div key={song.id} className="text-center p-3 w-full h-full">
                      <img src={song.image} alt={song.name} className="w-64 h-64 mx-auto" />
                      <p>{song.name}</p>
                  </div>
              ))}
          </div>
        </div>

        <div className="lg:w-1/3 lg:fixed lg:top-18 lg:right-0">
          <Image
            className="relative m-auto mb-16"
            src="/dmuse.svg"
            alt="Next.js Logo"
            width={265.12}
            height={60}
            // priority
          />
          <h1 className="text-5xl text-center mb-16 mx-16">Give a Dedicated Song NFT</h1>
          <div className="text-center">
            <button className="bg-yellow-500 text-black font-bold rounded px-4 py-2 mb-16">Connect Wallet</button>
            <p className="text-sm">Connect your wallet to create a Dedicated Song NFT and give it away.</p>
            <p className="text-sm">Example text...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
