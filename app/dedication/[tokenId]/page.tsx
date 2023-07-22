"use client";
import { useDMuseContract } from '@/hooks';
import { useEffect, useState } from 'react';
// @ts-ignore
import { useWallet } from 'useink';
import Image from 'next/image'
import { SongItem } from '@/data/songs';
import WalletConnection from '@/components/WalletConnection';

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

  const playSong = () => {
    console.log(playSong)
  } 

  return (
    <>
      <h1 className='text-center text-4xl my-8'>This is a Dedicated NFT Song</h1>
      <div className="flex items-center justify-center flex-col">
        <div className="mb-8">
          <WalletConnection />
        </div>
        {!account ? <p>Connect your wallet to see this dedicated song</p> : null}
        {!isTokenOwner && account ? <p>You are not the owner of this Dedicated Song NFT</p> : null}
      </div>
      <p></p>
      {account && isTokenOwner && metadata ? <div className='lg:flex p-4'>
        <div className='m-auto flex flex-col lg:w-1/3 items-center'>
          <Image width={250} height={250} src={metadata?.image as string} alt={metadata?.name as string} />
          <p className='mt-8'>Song: {metadata?.name}</p>
          <p className='mt-8'>Artist: {metadata?.attributes?.find(attr => attr.trait_type === 'artist')?.value}</p>
          <h1 className='mt-8'>Dedicatory</h1>
          <h2 className='mt-4'>{metadata?.attributes?.find(attr => attr.trait_type === 'dedicatory')?.value}</h2>
          <button onClick={() => playSong()} className="my-8 bg-yellow-500 text-black hover:bg-yellow-700 font-bold py-2 px-4 rounded">
              Play Song
            </button>
        </div>
      </div>: null}
    </>
  );
}
