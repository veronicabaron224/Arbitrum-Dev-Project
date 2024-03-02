import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0xD4773bB9cBAe8f03904523a595Ae4057a3B5Eb3C",
        abi as any,
        signer
    );
}