import { PropsWithChildren, createContext } from "react";
import { useContract, DryRun, useDryRun, useTx, Tx, useCall, Call, ChainContract } from "useink";
import { CONTRACT_ADDRESS } from "../const";
import metadata from "../target/ink/dmuseminter/dmuseminter.json";
import { MintingResult, TotalSupplyResult } from "../types";
import { useTxNotifications } from "useink/notifications";

interface DMuseContractState {
  dmuse?: ChainContract;
  mintDryRun?: DryRun<MintingResult>;
  mint?: Tx<MintingResult>;
  totalSupply?: Call<TotalSupplyResult>;
  ownerOf?: Call<TotalSupplyResult>;
  tokenUri?: Call<TotalSupplyResult>;
}

export const DMuseContractContext = createContext<DMuseContractState>({});

export function DMuseContractProvider({ children }: PropsWithChildren) {
  const dmuse = useContract(CONTRACT_ADDRESS, metadata);
  const mintDryRun = useDryRun<MintingResult>(dmuse, 'mint');
  const mint = useTx(dmuse, 'mint');
  useTxNotifications(mint);
  const totalSupply = useCall<TotalSupplyResult>(dmuse, 'psp34::totalSupply');
  const ownerOf = useCall<TotalSupplyResult>(dmuse, 'psp34::ownerOf');
  const tokenUri = useCall<TotalSupplyResult>(dmuse, 'tokenUri');

  return (
    <DMuseContractContext.Provider value={{ dmuse, mintDryRun, mint, totalSupply, ownerOf, tokenUri }}>
      {children}
    </DMuseContractContext.Provider>
  );
}