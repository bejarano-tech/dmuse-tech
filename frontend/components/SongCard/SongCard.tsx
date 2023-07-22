"use client"
import Image from "next/image";
import DedicateButton from "../DedicateButton";
import ClapButton from "../ClapButton";
import useMediaQueries from "@/hooks/useMediaQueries";
import { SongItem } from "@/data/songs";
import { ReducerActionProps, useDispatchDMuseAudio } from "../DMuseAudio";
import { Dispatch } from "react";
import Link from "next/link";

interface SongCardProps {
  song: SongItem;
  dedicate?: boolean;
}

const SongCard = ({ song, dedicate = true }: SongCardProps) => {
  const { isDesktop } = useMediaQueries()
  const dispatch = useDispatchDMuseAudio() as Dispatch<ReducerActionProps>;

  const handlePlay = () => {
    console.log("Handle play")
    dispatch({
      type: "PLAY",
      payload: {
        playingRelease: {
          id: 0,
          artist: song.attributes?.find(({trait_type}) => trait_type === 'artist')?.value as string,
          image: song.image as string,
          name: song.name as string,
          price: 0,
          tokens_qty: 0,
          track: song.external_url as string,
        },
      },
    });
  };

  return (
    <>
      <div
        key={song.id}
        className="relative text-center p-3 w-full h-full border border-white rounded"
      >
        <div className="relative group">
          <button
            onClick={handlePlay}
            className={`absolute inset-0 bg-cover bg-center ${!isDesktop ? 'opacity-0 group-hover:opacity-100 transition-opacity' : '' }`}
            style={{
              backgroundImage: `url('/play.svg')`,
            }}
          ></button>
          <div style={{height: "256px"}}>
            <Image
              src={song.image as string}
              alt={song.name as string}
              className="mx-auto"
              width={256}
              height={256}
            />
          </div>
        </div>
        <p className="mt-4">{song.name}</p>
        <p className="mb-2">{song.attributes?.find(({trait_type}) => trait_type == 'artist')?.value}</p>
        <div className="mx-auto  p-1 rounded flex justify-center items-center mb-4 w-1/2 border border-white">
          <Image src="/clap-white.svg" alt="claps" width={30} height={30} />
          <p className="ml-2">300</p>
        </div>
        <div className="flex flex-col items-center">
          {dedicate ? <DedicateButton song={song} /> : null}
          <ClapButton />
          {(song.id) ?
            <Link href={`/dedication/${song.id}`}>
              See Dedication
            </Link>
            : null
          }
        </div>
      </div>
    </>
  );
};

export default SongCard;
