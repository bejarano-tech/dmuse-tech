import { useContext } from "react";
import { DMuseContractContext } from "../context";

export const useDMuseContract = () => {
  const context = useContext(DMuseContractContext);

  if (context === undefined) {
    throw new Error(
      "useLinkContract must be used within a LinkContractProvider"
    );
  }

  return context;
}