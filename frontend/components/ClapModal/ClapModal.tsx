"use client"
import cn from 'classnames'
import Image from 'next/image'
import { useState } from 'react'
interface ModalProperties {
  isOpen: boolean
  onClose: () => {}
}

const ClapModal = ({ isOpen, onClose }: ModalProperties) => {
  const [claps, setClaps] = useState(0)
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 overflow-auto flex">
      <div className="relative p-6 bg-black border border-white w-full max-w-md m-auto flex-col flex rounded">
        <span
          className="absolute top-0 right-0 p-4 cursor-pointer text-white"
          onClick={onClose}
        >
          X
        </span>
        <div className="px-5 py-4 text-black">
          <h2 className="text-2xl font-bold mb-4 text-white">Send Claps</h2>
          <div className='flex justify-center'>
            <Image
              className="mb-4"
              src="https://via.placeholder.com/75"
              alt="Placeholder"
              width={75}
              height={75}
            />
            <div className='flex flex-col ml-4 mt-2'>
              <p className='uppercase text-left text-white'>Artist Name</p>
              <p className='text-left text-white'>Song Name</p>
            </div>
          </div>
          <p className="mb-4 text-white">Send Claps to this song`s Artist.</p>
          <div className='flex flex-col items-center'>
            <input
              className="border rounded w-1/2 py-2 px-3 text-center text-grey-darker mb-4"
              type="number"
              max={100}
              min={0}
              defaultValue={0}
              onChange={(e) => setClaps(e.target.value as unknown as number)}
              name="claps"
              placeholder="Enter the amount of claps to send"
            />
            <p className='text-white mb-4'>{claps ? claps : '0'} clap{claps > 0 ? 's' : ''} = {claps ? claps * 0.5 : '0'} TZERO</p>
            <button disabled={!(claps > 0)} className={cn('w-full text-black font-bold py-2 px-4 rounded', {'bg-yellow-700': claps == 0}, {'bg-yellow-500 hover:bg-yellow-700': claps > 0})}>
              Send Claps
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClapModal
