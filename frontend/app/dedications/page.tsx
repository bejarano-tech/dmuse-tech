"use client";
import { useDMuseContract } from "@/hooks";
import { Dispatch, useEffect, useMemo, useState } from "react";
// @ts-ignore
import { useWallet } from "useink";
import Image from "next/image";
import { SongItem } from "@/data/songs";
import WalletConnection from "@/components/WalletConnection";
import {
  ReducerActionProps,
  useDispatchDMuseAudio,
} from "@/components/DMuseAudio";
import Link from "next/link";
import SongCard from "@/components/SongCard";
import SongsList from "@/components/SongsList";

export default function Dedication({
}: {
}) {
  const { account } = useWallet();
  const { ownerOf, tokenUri, totalSupply } = useDMuseContract();
  const dispatch = useDispatchDMuseAudio() as Dispatch<ReducerActionProps>;

  const [isTokenOwner, setIsTokenOwner] = useState(false);
  const [metadata, setMetadata] = useState<undefined | SongItem>();
  const [dedications, setDedications] = useState<SongItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect( () => {
    const load = async () => {
      setLoading(true);
      const supply = await totalSupply?.send()
      const dedications = []
      for (let index = 0; index < supply?.value.decoded; index++) {
        const ownerOfResponse = await ownerOf?.send([{ u8: index }]);
        // @ts-ignore
        const isOwner = ownerOfResponse?.value.decoded == account.address;
        
        console.log(isOwner)
        if (isOwner) {
          const tokenUriResponse = await tokenUri?.send([{u8: index}])
          const base_uri = tokenUriResponse?.value.decoded.Ok;
          const response = await fetch(base_uri);
          const dedication = await response.json();
          dedication.id = index
          dedications.push(dedication)
        }else {
          setLoading(false);
        }
      }
      setDedications(dedications)
    }

    load();
  }, [ownerOf?.send])

  return (
    <>
    <h1 className="text-center text-4xl my-8">
      This are your dedications
    </h1>
    <div className="flex items-center justify-center flex-col">
      <div className="mb-8">
        <WalletConnection />
      </div>
      {!account ? (
        <p>Connect your wallet to see your dedications</p>
      ) : null}

    </div>
    {account ? (
      <div className="lg:flex p-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10 m-auto">
          <SongsList songs={dedications} dedicate={false} />
        </div>
      </div>
    ) : null}
  </>
    // <>
    //   <header className="p-4 flex justify-start">
    //     <Link href="/">
    //       <Image alt='Logo' src="/dmuse.svg" height={40} width={100}/>
    //     </Link>
    //   </header>
    //   <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
    //     <SongsList songs={dedications} dedicate={false} />
    //   </div>
    // </>
  );
}
