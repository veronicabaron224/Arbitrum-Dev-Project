"use client"
import React from 'react';
import PageDesign from './pagedesign';
import useFunctions from './functions';

const Home = () => {
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
    <PageDesign
      walletKey={walletKey}
      mintingAmount={mintingAmount}
      stakingAmount={stakingAmount}
      connectWallet={connectWallet}
      mintCoin={mintCoin}
      mintAmountChange={mintAmountChange}
      stakeCoin={stakeCoin}
      stakeAmountChange={stakeAmountChange}
      withdrawCoin={withdrawCoin}
      notification={notification}
      closeNotification={closeNotification}
      transactionHistory={transactionHistory}
      showTransactions={showTransactions}
      toggleTransactionHistory={toggleTransactionHistory}
      importToken={importToken}
    />
  );
};

export default Home;