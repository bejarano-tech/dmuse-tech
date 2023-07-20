"use client";
import { ApiPromise, WsProvider } from '@polkadot/api';
import metadata from '../../target/ink/dmuseminter/dmuseminter.json'
import { ContractPromise } from '@polkadot/api-contract';
import { useWallet } from 'useink';

// Store your contract's ABI
const CONTRACT_ABI = metadata;
// Store contract address
const CONTRACT_ADDRESS = '5HaaRi9XvrfT1Y1uztJK2vfnLUsJ6P1Q8aF2hGBW17rHoYr6'

export default function Dedication() {
  const { account } = useWallet();
  
  console.log(account)

  const handleClick = async () => {
    const wsProvider = new WsProvider("wss://ws.test.azero.dev/");
    const api = await ApiPromise.create({ provider: wsProvider });
    const contract = new ContractPromise(api, CONTRACT_ABI, CONTRACT_ADDRESS);
    // @ts-ignore
    const maximumBlockWeight = api.consts.system.blockWeights.maxBlock as unknown as WeightV2
    const maxGas = maximumBlockWeight.refTime.toNumber() * 0.9
    const gl = api.registry.createType('WeightV2', {
        refTime: maxGas,
        proofSize: maxGas,
    // @ts-ignore
    }) as WeightV2

    const totalSuppy = await contract.query['psp34::totalSupply'](account.address, { gasLimit: gl })
    .then((res) => {
      // @ts-ignore
      if (!res?.result?.toHuman()?.Err) return res.output.toHuman().Ok;
    });

    const myDedications = []

    for (let index = 0; index < totalSuppy; index++) {
      let owner = await contract.query['psp34::ownerOf'](account.address, { gasLimit: gl }, {u8: index})
      .then((res) => {
        // @ts-ignore
        if (!res?.result?.toHuman()?.Err) return res.output.toHuman().Ok;
      });
      
      if(owner === account.address){
        myDedications.push(index)
      }
    }

    const myTokens = await Promise.all(
      myDedications.map(async (dedication) => {
        let tokenUri = await contract.query['tokenUri'](account.address, { gasLimit: gl }, {u8: dedication})
        .then((res) => {
          // @ts-ignore
          if (!res?.result?.toHuman()?.Err) return res.output.toHuman().Ok.Ok;
        });
        return {id: dedication, tokenUri}
      })
    )

    console.log(myTokens)

  }

  return (
    <>
    <p>hola</p>
      <button onClick={handleClick}>
        Get Result
      </button>
    </>
  );
}
