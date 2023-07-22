import { SongItem } from '@/data/songs';
import Image from 'next/image'
import { SetStateAction, useState } from 'react';
import { useWallet } from 'useink';
import { useDMuseContract } from '@/hooks';
import Link from 'next/link';
import WAValidator from 'multicoin-address-validator';

interface ModalProperties {
  isOpen: boolean
  onClose: () => {}
  song: SongItem
}

const DedicateModal = ({ isOpen, onClose, song }: ModalProperties) => {
  const [step, setStep] = useState(0);
  const [dedicatory, setDedicatory] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const [songMetadata, setSongMetadata] = useState<SongItem | undefined>(song)
  const { account } = useWallet();
  const {mint, mintDryRun, dmuse, totalSupply} = useDMuseContract();
  const [dedicationUrl, setDedicationUrl] = useState<string | undefined>()
  const [validWalletAddress, setValidWalletAddress] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)

  if (!isOpen) {
    return null;
  }

  const handleOnClose = () => {
    setValidWalletAddress(false)
    setDedicatory('')
    setSongMetadata(song)
    setStep(0)
    onClose()
  }

  const handleSetDedication = () => {
    const attributes = song?.attributes?.map(attr => attr)
    attributes?.push({trait_type: 'dedicatory', value: dedicatory})
    setSongMetadata({...songMetadata, attributes })
    setStep(1)
  }

  const handleSetWalletAddress = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if(validWalletAddress){
      setStep(2)
      console.log('This is a valid address');}
    else {
      console.log('Address INVALID');
    }
  }

  const handleWalletAddressOnChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setWalletAddress(event.target.value)
    const valid = WAValidator.validate(event.target.value as string, 'dot', 'testnet');
    setValidWalletAddress(valid)
  }

  const handleMint = async () => {
    setStep(3)
    const supply = await totalSupply?.send()

    const response = await fetch('/api/pin-metadata', {
      method: 'POST',
      body: JSON.stringify(songMetadata)
    })
    const { IpfsHash } = await response.json();
    const base_uri = `https://scarlet-brilliant-roundworm-590.mypinata.cloud/ipfs/${IpfsHash}`
    //@ts-ignore
    mintDryRun?.send([walletAddress, {u8: parseInt(supply?.value.decoded)}, base_uri])

    if(!mintDryRun?.result?.ok){ 
      setStep(3)
     }
    //@ts-ignore
    mint?.signAndSend([walletAddress, { u8: parseInt(supply?.value.decoded) }, base_uri], undefined, (result, _api, error) => {
      if(error){
        console.error(JSON.stringify(error));
      }
      if (!result?.status.isInBlock) return;
      //@ts-ignore
      setDedicationUrl(`${process.env.NEXT_PUBLIC_BASE_URL}/dedication/${parseInt(supply?.value.decoded)}`)
      setStep(4)
    })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(dedicationUrl as string)
    setCopied(true)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-6 bg-black border border-white w-full max-w-lg m-auto flex-col flex rounded">
        <span
          className="absolute top-0 right-0 p-4 cursor-pointer text-white"
          onClick={handleOnClose}
        >
          X
        </span>
        {
          step === 0 ?
            <div className="px-5 py-4 text-white">
            <h2 className="text-2xl font-bold mb-4">Write your dedicatory</h2>
            <div className='flex justify-center'>
              <Image
                className="mb-4"
                src={song.image as string}
                alt={song.name as string}
                width={75}
                height={75}
              />
              <div className='flex flex-col ml-4 mt-2'>
                <p className='uppercase text-left'>{song?.attributes?.find(att => att.trait_type == 'artist')?.value}</p>
                <p className='text-left'>{song.name}</p>
              </div>
            </div>
            <form onSubmit={handleSetDedication}>
              <textarea
                required
                maxLength={200}
                className="border rounded w-full py-2 px-3 text-black mb-4"
                name="name"
                placeholder="Write your dedicatory"
                onChange={(event) => setDedicatory(event.target.value)}
              />
              <p className="mb-4 text-white">Write your dedicatory so yor fellow will see it when listen the song.</p>
              <button type='submit' className="bg-yellow-500 w-full text-black hover:bg-yellow-700 font-bold py-2 px-4 rounded">
                Next
              </button>
            </form>
            </div>
          : null
        }
        {
          step === 1 ?
            <div className="px-5 py-4 text-white">
            <h2 className="text-2xl font-bold mb-4">Tell us about your honoree</h2>
            <form onSubmit={handleSetWalletAddress}>
              <input
                required
                onChange={handleWalletAddressOnChange}
                className="border rounded w-full py-2 px-3 text-black"
                name="name"
                autoComplete='off'
                placeholder="Wallet Address of your fellow"
              />
              {(walletAddress.length > 0) && !validWalletAddress ? <p className='text-red-500 mb-4'>Invalid wallet address</p> :  null}
              <p className="mb-4 text-white mt-8">Enter the wallet address you want send a Dedicated Song NFT.</p>
              <button type='submit' className="bg-yellow-500 w-full text-black hover:bg-yellow-700 font-bold py-2 px-4 rounded">
                Next
              </button>
            </form>
            </div>
          : null
        }
        {
          step === 2 ?
            <div className="px-5 py-4 text-white">
            <h2 className="text-2xl font-bold mb-4">This is how it looks</h2>
            <h3>The song:</h3>
            <p>{song.name}</p>
            <h3>From artist:</h3>
            <p>{song?.attributes?.find(att => att.trait_type === 'artist')?.value}</p>
            <h3>Is going to be minted in this wallet:</h3>
            <p>{walletAddress}</p>
            <h3>With this dedicatory</h3>
            <p>{dedicatory}</p>
            <p className="mb-4 mt-16 text-white">This operation doesn`t have reverse, are you sure the data is Ok?</p>
            <button onClick={() => handleMint()} className="bg-yellow-500 w-full text-black hover:bg-yellow-700 font-bold py-2 px-4 rounded">
              Dedicate (Mint)
            </button>
            </div>
          : null
        }
        {
          step === 3 ?
            <div className="px-5 py-4 text-white">
              <h2 className="text-2xl font-bold mb-4">Minting</h2>
              <h3>Your dedicated song being minted</h3>
            </div>
          : null
        }
        {
          step === 4 ?
            <div className="px-5 py-4 text-white">
              <h2 className="text-2xl font-bold mb-4">Song Dedicated</h2>
              <h3>The dedicated song was minted as an NFT</h3>
              <p>Your dedication link is:</p>
              <Link href={dedicationUrl as string} className="text-yellow-500" >{dedicationUrl}</Link>
              <button onClick={() => handleCopy()} className="mt-8 bg-yellow-500 w-full text-black hover:bg-yellow-700 font-bold py-2 px-4 rounded">
                {copied ? 'Copied' : 'Copy NFT url'}
              </button>
            </div>
          : null
        },
        {
          step === 5 ?
            <div className="px-5 py-4 text-white">
              <h2 className="text-2xl font-bold mb-4">Transaction fail</h2>
              <h3>Try again</h3>
            </div>
          : null
        }
      </div>
    </div>
  );
};

export default DedicateModal;
