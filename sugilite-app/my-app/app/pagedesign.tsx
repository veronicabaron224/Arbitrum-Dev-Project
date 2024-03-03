import React from 'react';
import useFunctions from './functions';

interface PageDesignProps {
    walletKey: string;
    mintingAmount?: number;
    stakingAmount?: number;
    connectWallet: () => Promise<void>;
    mintCoin: () => Promise<void>;
    mintAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    stakeCoin: () => Promise<void>;
    stakeAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    withdrawCoin: () => Promise<void>;
    notification: string | null;
    closeNotification: () => void;
    transactionHistory: string[];
    showTransactions: boolean;
    toggleTransactionHistory: () => void;
    importToken: () => void;
  }
  
  const PageDesign: React.FC<PageDesignProps> = (props) => {
    const {
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
      showTransactions,
      toggleTransactionHistory,
      importToken,
    } = useFunctions();

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
};

export default PageDesign;
