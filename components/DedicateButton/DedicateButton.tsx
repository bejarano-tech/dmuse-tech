"use client"

import { useState } from "react"
import DedicateModal from "../DedicateModal"

const DedicateButton = () => {
  const  [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mb-8 w-1/2 bg-yellow-500 hover:bg-yellow-700 text-black font-bold rounded px-4 py-2 focus:outline-none"
      >
        Dedicate
      </button>
      <DedicateModal isOpen={isOpen} onClose={async () => setIsOpen(false)} />
    </>
  )
}

export default DedicateButton
