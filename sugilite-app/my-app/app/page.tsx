"use client";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContract } from "../config";

export default function Home() {
  const [walletKey, setwalletKey] = useState("");
  const [currentData, setcurrentData] = useState("");

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setwalletKey(accounts[0]);
  };

  // Mint
  const [mintingAmount, setMintingAmount] = useState<number>();
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");

  
  const mintCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.mint(signer, mintingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };

  const mintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setMintingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setMintingAmount(0);
    }
  };  

  // Stake
  const [stakingAmount, setStakingAmount] = useState<number>();
  const stakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.stake(stakingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  
  const stakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setStakingAmount(0);
    }
  };
 
  // Withdraw
  const withdrawCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };

  // Import Token
  const importToken = async() => {
    const {ethereum} = window as any;
    const tokenAddress = "0xd4773bb9cbae8f03904523a595ae4057a3b5eb3c";
    const tokenSymbol = "SGC";
    const tokenDecimal = 18;
    const tokenImage = "https://github.com/veronicabaron224/Sugilite-Project/blob/7c9590307fb84cfb9ec89252758b1bb5e54cc7cc/dapp/SugiliteGem.png";

    try{
      const wasAdded = await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimal,
            image: tokenImage,
          },
        },
      });
    }
    catch(error){
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-300 via-purple-300 to-indigo-500 animate-gradient">
      <div className="bg-white rounded p-8 shadow-2xl text-navy-blue">
        <p className="text-3xl mb-4 font-rubik font-bold">
          SUGILITECOIN: Mint and Stake
        </p>

        <div className="mb-6 flex flex-col items-center md:flex-row md:items-center md:justify-center space-y-4 md:space-y-0 md:space-x-4">
          <button onClick={() => {connectWallet();}}
            className="p-3 bg-button-color text-white rounded hover:bg-navy-blue transition-colors font-rubik font-bold">
            {walletKey != "" ? walletKey : " Connect Wallet"}
          </button>

          <button
            onClick={importToken}
            className="p-3 bg-button-color text-white rounded hover:bg-navy-blue transition-colors font-rubik font-bold"
          >
            Import Token
          </button>
        </div>

        <div className="mb-8 flex flex-col items-center md:flex-row md:items-center md:justify-center space-y-4 md:space-y-0 md:space-x-4">
          <form className="flex items-center">
            <label className="mr-2 font-rubik font-bold">
              Enter Amount to Mint
            </label>
          </form>
          <input
            type="number"
            value={mintingAmount}
            onChange={(e) => mintAmountChange(e)}
            className="p-2 bg-white rounded border-2 border-lavender font-rubik"
          />
          <button
            onClick={() => {
              mintCoin();
            }}
            className="p-3 bg-button-color text-white rounded hover:bg-navy-blue transition-colors font-rubik font-bold"
          >
            {"Mint"}
          </button>

          <form className="flex items-center">
            <label className="mr-2 font-rubik font-bold">
              Enter Amount to Stake
            </label>
          </form>
          <input
            type="number"
            value={stakingAmount}
            onChange={(e) => stakeAmountChange(e)}
            className="p-2 bg-white rounded border-2 border-lavender font-rubik"
          />
          <button
            onClick={stakeCoin}
            className="p-3 bg-button-color text-white rounded hover:bg-navy-blue transition-colors font-rubik font-bold"
          >
            {"Stake"}
          </button>
        </div>

        <div className="mb-8 text-center">
          <button
            onClick={withdrawCoin}
            className="p-3 bg-button-color text-white rounded hover:bg-navy-blue transition-colors font-rubik font-bold transform transition-transform hover:scale-105"
          >
            Withdraw
          </button>
          <p>Please wait at least 1 minute before withdrawing.</p>
        </div>
      </div>
    </main>
  );
}