import Image from 'next/image'

export default function Home() {
  const songs = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    name: `Song ${i + 1}`,
    image: `/song-images/image${i + 1}.png`,
  }));
  return (
    <div className="font-sans">
      <header className="p-4 flex justify-end">
        <button className="bg-blue-500 text-white rounded px-4 py-2">Login</button>
      </header>

      <div className="lg:flex p-4">
        <div className="lg:w-2/3 lg:pr-4 pb-4 lg:pb-0">
          <div className="grid lg:grid-cols-3 gap-4">
            {songs.map((song) => (
              <div key={song.id} className="text-center">
                <img src={song.image} alt={song.name} className="w-32 h-32 mx-auto" />
                <p>{song.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-1/3">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
          <h2 className="text-2xl text-center my-4">Give a Dedicated Song NFT</h2>
          <div className="text-center">
            <button className="bg-blue-500 text-white rounded px-4 py-2 mb-2">Login</button>
            <p className="text-sm">Login to create a Dedicated Song NFT and give it away.</p>
            <p className="text-sm">Example text...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
