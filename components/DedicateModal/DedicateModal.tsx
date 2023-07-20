import { SongItem } from '@/data/songs';
import Image from 'next/image'
import { useState } from 'react';
interface ModalProperties {
  isOpen: boolean
  onClose: () => {}
  song: SongItem
}

const DedicateModal = ({ isOpen, onClose, song }: ModalProperties) => {
  const [step, setStep] = useState(0);
  if (!isOpen) {
    return null;
  }

  const handleOnClose = () => {
    setStep(0)
    onClose()
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
                <p className='uppercase text-left'>Fermata</p>
                <p className='text-left'>{song.name}</p>
              </div>
            </div>
            <textarea
              className="border rounded w-full py-2 px-3 text-black mb-4"
              name="name"
              placeholder="Write your dedicatory"
            />
            <p className="mb-4 text-white">Write your dedicatory so yor fellow will see it when listen the song.</p>
            <button onClick={() => setStep(1)} className="bg-yellow-500 w-full text-black hover:bg-yellow-700 font-bold py-2 px-4 rounded">
              Next
            </button>
            </div>
          : null
        }
        {
          step === 1 ?
            <div className="px-5 py-4 text-white">
            <h2 className="text-2xl font-bold mb-4">Tell us about your honoree</h2>
            <input
              className="border rounded w-full py-2 px-3 text-black mb-4"
              name="name"
              placeholder="Wallet Address of your fellow"
            />
            <input
              className="border rounded w-full py-2 px-3 text-black mb-4"
              name="name"
              placeholder="Email Address of your fellow"
            />
            <p className="mb-4 text-white">This will ensure that the honoree is going to know about your dedication.</p>
            <button onClick={() => setStep(2)} className="bg-yellow-500 w-full text-black hover:bg-yellow-700 font-bold py-2 px-4 rounded">
              Next
            </button>
            </div>
          : null
        }
        {
          step === 2 ?
            <div className="px-5 py-4 text-white">
            <h2 className="text-2xl font-bold mb-4">This is how it looks</h2>
            <h3>The song:</h3>
            <p>Song 1</p>
            <h3>From artist:</h3>
            <p>Artist 1</p>
            <h3>Is going to be minted in this wallet:</h3>
            <p>Wallet Address</p>
            <h3>With this dedicatory</h3>
            <p>Dedicatory of example, i remeber this song ...</p>
            <p className="mb-4 mt-16 text-white">This operation doesn`t have reverse, are you sure the data is Ok?</p>
            <button onClick={() => setStep(3)} className="bg-yellow-500 w-full text-black hover:bg-yellow-700 font-bold py-2 px-4 rounded">
              Next
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
