"use client";
import { useDMuseContract } from '@/hooks';
import { useEffect, useState } from 'react';
// @ts-ignore
import { useWallet } from 'useink';
import Image from 'next/image'
import { SongItem } from '@/data/songs';

export default function Dedication({ params }: {params: { tokenId: string }}) {
  const { tokenId } =  params;
  const { account } = useWallet();
  const { ownerOf, tokenUri } = useDMuseContract()

  const [isTokenOwner, setIsTokenOwner] = useState(false)
  const [metadata, setMetadata] = useState<undefined | SongItem>()

  useEffect(() => {
    if(!account) return;
    const init = async  () => {
      const ownerOfResponse = await ownerOf?.send([{u8: tokenId}])
      console.log(ownerOfResponse)
      // @ts-ignore
      const isOwner = ownerOfResponse?.value.decoded == account.address
      setIsTokenOwner(isOwner)
      if(isOwner){
        const tokenUriResponse = await tokenUri?.send([{u8: tokenId }])
        // @ts-ignore
        const base_uri = tokenUriResponse?.value.decoded.Ok
        const response = await fetch(base_uri);
        const metadata = await response.json();
        setMetadata(metadata);
      }
    }
    init()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownerOf?.send])

  return (
    <>
      {isTokenOwner ? <div className='lg:flex p-4'>
        <div className='m-auto flex flex-col lg:w-1/3 items-center'>
          <Image width={250} height={250} src={metadata?.image as string} alt={metadata?.name as string} />
          <p>Song: {metadata?.name}</p>
          <p>Artist: {metadata?.attributes?.find(attr => attr.trait_type === 'artist')?.value}</p>
          <h1>Dedicatory</h1>
          <h2>{metadata?.attributes?.find(attr => attr.trait_type === 'dedicatory')?.value}</h2>
        </div>
      </div>: null}
    </>
  );
}
