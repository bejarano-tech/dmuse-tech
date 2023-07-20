"use client"
import Image from "next/image";
import DedicateButton from "../DedicateButton";
import ClapButton from "../ClapButton";
import useMediaQueries from "@/hooks/useMediaQueries";
import { SongItem } from "@/data/songs";

interface SongCardProps {
  song: SongItem;
}

const SongCard = ({ song }: SongCardProps) => {
  const { isDesktop } = useMediaQueries()

  return (
    <>
      <div
        key={song.id}
        className="relative text-center p-3 w-full h-full border border-white rounded"
      >
        <div className="relative group">
          <button
            className={`absolute inset-0 bg-cover bg-center ${!isDesktop ? 'opacity-0 group-hover:opacity-100 transition-opacity' : '' }`}
            style={{
              backgroundImage: `url('/play.svg')`,
            }}
          ></button>
          <Image
            src={song.image}
            alt={song.name}
            className="mx-auto"
            width={256}
            height={256}
          />
        </div>
        <p className="mt-4">{song.name}</p>
        <p className="mb-2">Artist</p>
        <div className="mx-auto  p-1 rounded flex justify-center items-center mb-4 w-1/2 border border-white">
          <Image src="/clap-white.svg" alt="claps" width={30} height={30} />
          <p className="ml-2">300</p>
        </div>
        <div className="flex flex-col items-center">
          <DedicateButton song={song} />
          <ClapButton />
        </div>
      </div>
    </>
  );
};

export default SongCard;
