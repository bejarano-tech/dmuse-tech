"use client";

import { useState } from "react";
import ClapModal from "../ClapModal";
import { useWallet } from "useink";

const ClapButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { account } = useWallet();
  return (
    <>
      {account ? (
        <>
          <button
            onClick={() => setIsOpen(true)}
            className="mb-8 w-1/2 bg-yellow-500 text-black font-bold rounded px-4 py-2 focus:outline-none"
          >
            Clap
          </button>
          <ClapModal isOpen={isOpen} onClose={async () => setIsOpen(false)} />
        </>
      ) : null}
    </>
  );
};

export default ClapButton;
