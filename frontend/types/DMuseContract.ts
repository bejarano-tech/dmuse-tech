export type MintingOutcome =
  | "Minted"

export enum DMuseContractError {
}
export type MintingResult = MintingOutcome | DMuseContractError;

export interface TotalSupplyResult {
  ok: boolean
  value: { decoded: string }
}