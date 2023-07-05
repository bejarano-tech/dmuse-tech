"use client"
import { useState } from "react";
import { useAllWallets, useWallet } from "useink";

export const WalletConnection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { account, connect, disconnect } = useWallet()
  const wallets = useAllWallets();

  const handleConnect = (walletName: string) => {
    connect(walletName)
  }
  
  const handleDisconnect = () => {
    setIsOpen(false)
    disconnect()
  }



  if(account){
    return (
      <button
        onClick={() => handleDisconnect()}
        className="bg-black border border-yellow-500 text-white font-bold rounded px-4 py-2 focus:outline-none"
      >
        Disconnect
      </button>
    )
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-yellow-500 text-black font-bold rounded px-4 py-2 focus:outline-none"
      >
        Connect Wallet
      </button>

      {isOpen && (
        <div
          className="absolute flex flex-col left-0 mt-2 py-2 w-48 bg-black rounded shadow-xl z-10"
        >
          {wallets.map((w, index) => {
            return (
              <div className="flex" key={index}>
                {w.installed ?
                  <button
                    onClick={() => handleConnect(w.extensionName)}
                    className="w-full text-left px-4 py-2 text-white hover:bg-yellow-500"
                  >
                    {w.title}
                  </button>
                :
                <a
                  href={w.installUrl}
                  target="blank"
                  className="w-full text-left px-4 py-2 text-white hover:bg-yellow-500"
                >
                    <p>{w.title}</p>
                    <span>Not Installed</span>
                </a>
                }
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
