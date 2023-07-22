"use client";
import Image from "next/image";
import Link from "next/link";
import { useWallet } from "useink";

const Header = () => {
  const { account } = useWallet();
  return (
    <header className="p-4 flex justify-between">
      <Link href="/">
        <Image alt="Logo" src="/dmuse.svg" height={40} width={100} />
      </Link>
      <div className="flex">
        {account ? <Link className="mb-8 text-white border border-yellow-500 font-bold rounded px-4 py-2 focus:outline-none mr-8" href="/dedications">My Dedications</Link> : null}
        <p className="mt-0">Aleph Zero Testnet</p>
      </div>
    </header>
  );
};

export default Header;
