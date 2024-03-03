import { BrowserProvider } from 'ethers';
import { useEffect, useState } from 'react';
import { getContract } from '../config';

const useFunctions = () => {
  const [walletKey, setWalletKey] = useState("");
  const [mintingAmount, setMintingAmount] = useState<number>();
  const [stakingAmount, setStakingAmount] = useState<number>();
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [notification, setNotification] = useState<string | null>(null);
  const [transactionHistory, setTransactionHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setWalletKey(accounts[0]);
  };

  const updateTransactionHistory = (transaction: string) => {
    setTransactionHistory(prevHistory => [...prevHistory, transaction]);
  };

  const mintCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
  
    try {
      setLoading(true);
      const tx = await contract.mint(signer, mintingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
      updateTransactionHistory(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    } finally {
        setLoading(false);
    }
  };

  const mintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setMintingAmount(Number(inputValue));
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
      setLoading(true);
      const tx = await contract.stake(stakingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
      updateTransactionHistory(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Staking failed: ${decodedError?.args}`);
    } finally {
        setLoading(false);
    }
  };

  const stakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakingAmount(Number(inputValue));
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
      setLoading(true);
      const tx = await contract.withdraw();
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
      updateTransactionHistory(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Withdrawal failed: ${decodedError?.args}`);
    } finally {
        setLoading(false);
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

  return {
    walletKey,
    mintingAmount,
    stakingAmount,
    connectWallet,
    mintCoin,
    mintAmountChange,
    stakeCoin,
    stakeAmountChange,
    withdrawCoin,
    notification,
    closeNotification,
    transactionHistory,
    importToken,
    loading,
  };
};

export default useFunctions;