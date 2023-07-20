"use client"

import { useState } from "react"
import DedicateModal from "../DedicateModal"
import { useWallet } from "useink"
import { SongItem } from "@/data/songs"

interface DedicateButtonPros {
  song: SongItem
}

const DedicateButton = ({ song }: DedicateButtonPros) => {
  const  [isOpen, setIsOpen] = useState(false)
  const { account } = useWallet()
  return (
    <>
      {account ? (
        <>
          <button
            onClick={() => setIsOpen(true)}
            className="mb-8 w-full bg-yellow-500 hover:bg-yellow-700 text-black font-bold rounded px-4 py-2 focus:outline-none"
          >
            Dedicate Song
          </button>
          <DedicateModal
            isOpen={isOpen}
            song={song}
            onClose={async () => setIsOpen(false)}
          />
        </>
      ) : null}
    </>
  );
}

export default DedicateButton
