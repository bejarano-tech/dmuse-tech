"use client";

import { useState } from "react";
import ClapModal from "../ClapModal";
import { useWallet } from "useink";
import Image from 'next/image'

const ClapButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { account } = useWallet();
  return (
    <>
      {account ? (
        <>
          <button
            onClick={() => setIsOpen(true)}
            className="mb-8 w-full flex justify-center w-100 bg-yellow-500 text-black font-bold rounded px-4 py-2 focus:outline-none"
          >
            <span>Send Claps</span>
            <Image className="ml-2" src="/clap.svg" alt="Clap" width={20} height={20} />
          </button>
          <ClapModal isOpen={isOpen} onClose={async () => setIsOpen(false)} />
        </>
      ) : null}
    </>
  );
};

export default ClapButton;
