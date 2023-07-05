import Image from 'next/image'
import { useState } from 'react';
interface ModalProperties {
  isOpen: boolean
  onClose: () => {}
}

const DedicateModal = ({ isOpen, onClose }: ModalProperties) => {
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
                src="https://via.placeholder.com/75"
                alt="Placeholder"
                width={75}
                height={75}
              />
              <div className='flex flex-col ml-4 mt-2'>
                <p className='uppercase text-left'>Artist Name</p>
                <p className='text-left'>Song Name</p>
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
            <h2 className="text-2xl font-bold mb-4">Transfer it to your fellow</h2>
            <input
              className="border rounded w-full py-2 px-3 text-black mb-4"
              name="name"
              placeholder="Enter your email"
            />
            <input
              className="border rounded w-full py-2 px-3 text-black mb-4"
              name="name"
              placeholder="Enter the email of your fellow"
            />
            <p className="mb-4 text-white">Mint this NFT Dedicated Song and give away to your fellows.</p>
            <button className="bg-yellow-500 w-full text-black hover:bg-yellow-700 font-bold py-2 px-4 rounded">
              Next
            </button>
            </div>
          : null
        }
        {
          step === 2 ?
            <div className="px-5 py-4 text-white">
            <h2 className="text-2xl font-bold mb-4">Transfer it to your fellow</h2>
            <input
              className="border rounded w-full py-2 px-3 text-black mb-4"
              name="name"
              placeholder="Enter your email"
            />
            <input
              className="border rounded w-full py-2 px-3 text-black mb-4"
              name="name"
              placeholder="Enter the email of your fellow"
            />
            <p className="mb-4 text-white">Mint this NFT Dedicated Song and give away to your fellows.</p>
            <button className="bg-yellow-500 w-full text-black hover:bg-yellow-700 font-bold py-2 px-4 rounded">
              Next
            </button>
            </div>
          : null
        }
      </div>
    </div>
  );
};

export default DedicateModal;
