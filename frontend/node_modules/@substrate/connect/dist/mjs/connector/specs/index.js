import ksmcc3 from "./ksmcc3.json";
import polkadot from "./polkadot.json";
import rococo_v2_2 from "./rococo_v2_2.json";
import westend2 from "./westend2.json";
const chains = {
    ksmcc3,
    polkadot,
    rococo_v2_2,
    westend2,
};
export function getSpec(chain) {
    if (!Object.keys(chains).includes(chain))
        throw new Error("Invalid chain name");
    return JSON.stringify(chains[chain]);
}
//# sourceMappingURL=index.js.map