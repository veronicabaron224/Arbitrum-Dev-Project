import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0xb3284aA0a48Dc863bC0d10C8aa491C4333F71f24",
        abi as any,
        signer
    );
}