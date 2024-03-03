"use client";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContract } from "../config";

export default function Home() {
  const [walletKey, setWalletKey] = useState("");
  const [mintingAmount, setMintingAmount] = useState<number>();
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [stakingAmount, setStakingAmount] = useState<number>();
  const [notification, setNotification] = useState<string | null>(null);
  const [transactionHistory, setTransactionHistory] = useState<string[]>([]);
  const [showTransactions, setShowTransactions] = useState(false);

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setWalletKey(accounts[0]);
  };

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
      alert(`Staking failed: ${decodedError?.args}`);
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
      alert(`Withdrawal failed: ${decodedError?.args}`);
    }
  };

  useEffect(() => {
    if (submitted && transactionHash) {
      setNotification(`Transaction successful! Minted/staked amount: ${mintingAmount || stakingAmount}`);
    }
  }, [submitted, transactionHash, mintingAmount, stakingAmount]);

  const closeNotification = () => {
    setNotification(null);
  };

  const viewTransactions = () => {
    const mockTransactionHistory = [
      "Minted 100 SGC - TransactionHash1",
      "Staked 50 SGC - TransactionHash2",
      "Withdrawn 30 SGC - TransactionHash3",
    ];
    setTransactionHistory(mockTransactionHistory);
  };

  const toggleTransactionHistory = () => {
    if (showTransactions) {
      setTransactionHistory([]);
    } else {
      const mockTransactionHistory = [
        "Minted 100 SGC - TransactionHash1",
        "Staked 50 SGC - TransactionHash2",
        "Withdrawn 30 SGC - TransactionHash3",
      ];
      setTransactionHistory(mockTransactionHistory);
    }
    setShowTransactions(!showTransactions);
  };

  const importToken = async() => {
    const {ethereum} = window as any;
    const tokenAddress = "0x68a8651D7F362cB92516F6f2359fEA3aA8e67459";
    const tokenSymbol = "SGC";
    const tokenDecimal = 18;

    try{
      const wasAdded = await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimal,
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

        {/* Wallet, View/Hide Transactions, and Import buttons*/}
        <div className="mb-6 flex flex-col items-center md:flex-row md:items-center md:justify-center space-y-4 md:space-y-0 md:space-x-4">
          <button
            onClick={() => connectWallet()}
            className="p-3 bg-button-color text-white rounded hover:bg-navy-blue transition-colors font-rubik font-bold"
          >
            {walletKey !== "" ? walletKey : " Connect Wallet"}
          </button>
          <button
            onClick={() => toggleTransactionHistory()}
            className="p-3 bg-button-color text-white rounded hover:bg-navy-blue transition-colors font-rubik font-bold"
          >
            {showTransactions ? "Hide Transactions" : "View Transactions"}
          </button>
          <button
            onClick={importToken}
            className="p-3 bg-button-color text-white rounded hover:bg-navy-blue transition-colors font-rubik font-bold"
          >
            Import Token
          </button>
        </div>

        {/* Transaction History section */}
        {showTransactions && transactionHistory.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Transaction History</h3>
            <ul className="list-disc list-inside">
              {transactionHistory.map((transaction, index) => (
                <li key={index}>{transaction}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Minting and Staking input fields and buttons */}
        <div className="mb-8 flex flex-col items-center md:flex-row md:items-center md:justify-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Minting section */}
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
            onClick={() => mintCoin()}
            className="p-3 bg-button-color text-white rounded hover:bg-navy-blue transition-colors font-rubik font-bold"
          >
            Mint
          </button>

          {/* Staking section */}
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
            onClick={() => stakeCoin()}
            className="p-3 bg-button-color text-white rounded hover:bg-navy-blue transition-colors font-rubik font-bold"
          >
            Stake
          </button>
        </div>

        {/* Withdrawal section */}
        <div className="mb-8 text-center">
          <button
            onClick={() => withdrawCoin()}
            className="p-3 bg-button-color text-white rounded hover:bg-navy-blue transition-colors font-rubik font-bold transform transition-transform hover:scale-105"
          >
            Withdraw
          </button>
          <p>Please wait at least 15 seconds before withdrawing.</p>
        </div>

        {/* Notification */}
        {notification && (
          <div className="absolute top-4 right-4 bg-green-500 text-white p-4 rounded-md">
            <p>{notification}</p>
            <button onClick={closeNotification} className="mt-2 text-sm underline cursor-pointer">
              Close
            </button>
          </div>
        )}
      </div>
    </main>
  );
}