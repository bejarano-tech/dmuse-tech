import { SongItem } from '@/data/songs';
import metadata from '../../target/ink/dmuseminter/dmuseminter.json'
import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import Image from 'next/image'
import { useState } from 'react';
import { useWallet } from 'useink';
import { BN, stringCamelCase } from '@polkadot/util';
import { getAbiMessage } from '@/helpers/getAbiMessage';
// Store your contract's ABI
const CONTRACT_ABI = metadata;
// Store contract address
const CONTRACT_ADDRESS = '5HaaRi9XvrfT1Y1uztJK2vfnLUsJ6P1Q8aF2hGBW17rHoYr6'


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
  const { account, getWalletBySource } = useWallet();
  const keyring = new Keyring({ type: 'sr25519' });

  if (!isOpen) {
    return null;
  }

  const handleOnClose = () => {
    setDedicatory('')
    console.log(song)
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

  const handleSetWalletAddress = () => {
    setStep(2)
  }

  const handleMint = async () => {
    const response = await fetch('/api/pin-metadata', {
      method: 'POST',
      body: JSON.stringify(songMetadata)
    })
    const { IpfsHash } = await response.json();
    const base_uri = `https://gateway.pinata.cloud/ipfs/${IpfsHash}`
    console.log(base_uri)

    const wsProvider = new WsProvider("wss://ws.test.azero.dev/");
    const api = await ApiPromise.create({ provider: wsProvider });
    const contract = new ContractPromise(api, CONTRACT_ABI, CONTRACT_ADDRESS);
    // @ts-ignore
    const maximumBlockWeight = api.consts.system.blockWeights.maxBlock as unknown as WeightV2
    const maxGas = maximumBlockWeight.refTime.toNumber() * 0.9
    const gl = api.registry.createType('WeightV2', {
        refTime: maxGas,
        proofSize: maxGas,
    // @ts-ignore
    }) as WeightV2

    const totalSuppy = await contract.query['psp34::totalSupply'](account.address, { gasLimit: gl })
    .then((res) => {
      // @ts-ignore
      if (!res?.result?.toHuman()?.Err) return res.output.toHuman().Ok;
    });

    const alice = keyring.addFromUri('//Alice', { name: 'Alice default' });

    const abiMessage = contract.abi.messages.find(
      (m) => stringCamelCase(m.method) === stringCamelCase('mint'),
    )
    const result = await api.call.contractsApi.call(
      account.address,
      CONTRACT_ADDRESS,
      new BN(0),
      null,
      null,
      abiMessage?.toU8a([account.address, {u8: totalSuppy}, base_uri]))
    const gasLimit = result.gasRequired
    const mint = await contract.tx.
                                  mint({ gasLimit }, account.address, {u8: totalSuppy}, base_uri)
                                  .signAndSend(alice, async ({status, events, dispatchError}) => {
                                    // status would still be set, but in the case of error we can shortcut
                                    // to just check it (so an error would indicate InBlock or Finalized)
                                    if (dispatchError) {
                                      if (dispatchError.isModule) {
                                        // for module errors, we have the section indexed, lookup
                                        const decoded = api.registry.findMetaError(dispatchError.asModule);
                                        const { docs, name, section } = decoded;

                                        console.log(`${section}.${name}: ${docs.join(' ')}`);
                                      } else {
                                        // Other, CannotLookup, BadOrigin, no extra info
                                        console.log(dispatchError.toString());
                                      }
                                    }
                                  })
  }

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-6 bg-black border border-white w-full max-w-md m-auto flex-col flex rounded">
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
                src={song.image}
                alt={song.name}
                width={75}
                height={75}
              />
              <div className='flex flex-col ml-4 mt-2'>
                <p className='uppercase text-left'>{song.attributes.find(att => att.trait_type == 'artist')?.value}</p>
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
                onChange={(event) => setWalletAddress(event.target.value)}
                className="border rounded w-full py-2 px-3 text-black mb-4"
                name="name"
                placeholder="Wallet Address of your fellow"
              />
              <p className="mb-4 text-white">This will ensure that the honoree is going to know about your dedication.</p>
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
            <p>{song.attributes.find(att => att.trait_type === 'artist')?.value}</p>
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
            <h2 className="text-2xl font-bold mb-4">Song Dedicated</h2>
            <h3>The song was sended as an NFT</h3>
            </div>
          : null
        }
      </div>
    </div>
  );
};

export default DedicateModal;
