"use client";
import { useDMuseContract } from "@/hooks";
import { Dispatch, useEffect, useState } from "react";
// @ts-ignore
import { useWallet } from "useink";
import Image from "next/image";
import { SongItem } from "@/data/songs";
import WalletConnection from "@/components/WalletConnection";
import {
  ReducerActionProps,
  useDispatchDMuseAudio,
} from "@/components/DMuseAudio";

export default function Dedication({
  params,
}: {
  params: { tokenId: string };
}) {
  const { tokenId } = params;
  const { account } = useWallet();
  const { ownerOf, tokenUri } = useDMuseContract();
  const dispatch = useDispatchDMuseAudio() as Dispatch<ReducerActionProps>;

  const [isTokenOwner, setIsTokenOwner] = useState(false);
  const [metadata, setMetadata] = useState<undefined | SongItem>();

  useEffect(() => {
    if (!account) return;
    const init = async () => {
      const ownerOfResponse = await ownerOf?.send([{ u8: tokenId }]);
      // @ts-ignore
      const isOwner = ownerOfResponse?.value.decoded == account.address;
      setIsTokenOwner(isOwner);
      if (isOwner) {
        const tokenUriResponse = await tokenUri?.send([{ u8: tokenId }]);
        // @ts-ignore
        const base_uri = tokenUriResponse?.value.decoded.Ok;
        const response = await fetch(base_uri);
        const metadata = await response.json();
        setMetadata(metadata);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownerOf?.send]);

  const handlePlay = () => {
    dispatch({
      type: "PLAY",
      payload: {
        playingRelease: {
          id: parseInt(tokenId),
          artist: metadata?.attributes?.find(({trait_type}) => trait_type == 'artist' )?.value as string,
          image: metadata?.image as string,
          name: metadata?.name as string,
          price: 0,
          tokens_qty: 0,
          track: metadata?.external_url as string,
        },
      },
    });
  };

  return (
    <>
      <h1 className="text-center text-4xl my-8">
        This is a Dedicated NFT Song
      </h1>
      <div className="flex items-center justify-center flex-col">
        <div className="mb-8">
          <WalletConnection />
        </div>
        {!account ? (
          <p>Connect your wallet to see this dedicated song</p>
        ) : null}
        {!isTokenOwner && account ? (
          <p>You are not the owner of this Dedicated Song NFT</p>
        ) : null}
      </div>
      <p></p>
      {account && isTokenOwner && metadata ? (
        <div className="lg:flex p-4">
          <div className="m-auto flex flex-col lg:w-1/3 items-center">
            <Image
              width={250}
              height={250}
              src={metadata?.image as string}
              alt={metadata?.name as string}
            />
            <p className="mt-8">Song: {metadata?.name}</p>
            <p className="mt-8">
              Artist:{" "}
              {
                metadata?.attributes?.find(
                  (attr) => attr.trait_type === "artist"
                )?.value
              }
            </p>
            <h1 className="mt-8">Dedicatory</h1>
            <h2 className="mt-4">
              {
                metadata?.attributes?.find(
                  (attr) => attr.trait_type === "dedicatory"
                )?.value
              }
            </h2>
            <button
              onClick={() => handlePlay()}
              className="mb-16 mt-8 bg-yellow-500 text-black hover:bg-yellow-700 font-bold py-2 px-4 rounded"
            >
              Play Song
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
