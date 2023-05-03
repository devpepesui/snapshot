/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import styles from '../styles/Home.module.css';
import { useEffect, useState } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Image from 'next/image'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Form from '../components/Form';
import { useAccount, useSignMessage, useNetwork, useBalance } from 'wagmi'
import { fetchBalance } from '@wagmi/core'
import { WalletProvider } from '@suiet/wallet-kit';

const Program: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const { isConnected, address } = useAccount();
  const [hasEnoughPepe, setHasEnoughPepe] = useState(false);

  const { data: balance, isError, isLoading } = useBalance({
    address: address,
    token: '0x8520568339c077ad035E94b660F3258Ee8FD4b45'
  })

  /* console.log("balance", balance?.formatted)
  console.log('Number', Number(balance?.formatted)) */

  const checkPepeBalance = async () => {

    if (Number(balance?.formatted) >= Number(process.env.NEXT_PUBLIC_MIN_AMOUT)) {
      setHasEnoughPepe(true);
    } else {
      setHasEnoughPepe(false);
    }

  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (address) {
      checkPepeBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  if (loading) {
    return (
      <Image
        className="loading"
        src="/assets/img/loading.gif"
        alt="loading"
        layout="fill"
        objectFit="cover"
      />
    );
  }

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        {isConnected ?
          <div className="min-h-screen flex flex-col justify-center text-white text-center mx-auto items-center">
            <div className="text-center">
              <img className='mb-10 h-40' src="./assets/img/logoSnapshot.png" />
            </div>

            <div className='text-center justify-center border-cyan-900 border-2 rounded-md container'>
              <div className="px-5 py-5 flex items-center text-center mx-auto justify-center">
                <img className='h-10 mr-2 text-center' src="https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png" />
                <h1 className="text-center font-bold text-[#d6b032] text-2xl">BNB Chain</h1>
              </div>

              <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 items-center py-5 px-5">

                <div className="text-center mr-10">
                  <h1 className="text-blue-900 font-mono font-bold">Balance: {balance?.formatted + ' ' + balance?.symbol}</h1>
                </div>

                <div className="text-center">
                  <ConnectButton />
                </div>
              </div>
            </div>

            <div className='h-50 p-5 mt-3 items-center text-center'>
              <p className='text-4xl text-center text-white/50'>x</p>
            </div>

            {hasEnoughPepe ? (
              <div className="mt-5 container">
                <WalletProvider>
                  <Form />
                </WalletProvider>
              </div>
            ) : (
              <div className="space-y-2 mt-5">
                <h1 className="text-white mb-5">You do not have the required amount of PEPE.sui to access the program</h1>
                <br />
                <div className='mt-5'>
                  <a href="https://pancakeswap.finance/swap?outputCurrency=0x8520568339c077ad035e94b660f3258ee8fd4b45&inputCurrency=BNB" className="bg-gradient-to-br from-orange-500 to-orange-800 hover:from-orange-800 hover:to-orange-500 px-10 py-5 rounded-md font-bold
               text-white shadow-xl" target='_blank' rel="noreferrer">BUY PEPE.sui on PancakeSwap 🔥</a>
                </div>
                <div className=''>
                  <button className="mt-10 p-5 bg-gradient-to-br from-blue-500 to-blue-800 hover:from-blue-800 hover:to-blue-500 rounded-md font-bold
               text-white shadow-xl" onClick={checkPepeBalance}>Check PEPE.sui balance 🔍</button>
                </div>
              </div>
            )}
          </div>

          :

          <>
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col items-center mb-10">
                <img className='mb-10 h-40' src="./assets/img/logoSnapshot.png" />
                <h1 className='text-white font-bold text-3xl mb-2'>Connect your wallet</h1>
                <p className='text-blue-200 mb-10'>You must be connected in to participate in our program!</p>
                <ConnectButton />
              </div>
            </div>
          </>
        }

        <div className='text-stone-200 font-mono'>
          <p className='mt-10 text-lg text-stone-100'><b className='font-bold'>Note:</b> To participate in the NFT free mint program, it is necessary to meet certain requirements:</p>
          <ul className="list-inside list-disc text-sm mt-2">
            <li>Have a minimum wallet amount of 70,000,000,000  PEPE.sui on BNB Chain</li>
            <li>Hold PEPE.sui tokens until the snapshot day (05/05/2023 01:00 AM UTC)</li>
            <li>Have a minimum gas amount to mint the NFT on the SUI network</li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Program;
