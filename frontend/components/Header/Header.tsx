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
      {account ? <Link href="/dedications">My Dedications</Link> : null}
    </header>
  );
};

export default Header;
