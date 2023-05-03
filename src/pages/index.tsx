/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import styles from '../styles/Home.module.css';
import { useEffect, useState } from "react";
import type { NextPage } from 'next';
import Image from 'next/image'

const Home: NextPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

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
    <>
      <div className="min-h-screen flex flex-col justify-center text-white text-center mx-auto items-center">
        <div className="text-center">
          <img className='mb-3 h-20' src="./assets/img/logo.png" alt='PEPE.sui' title='The first PEPE on SUI Network' />
        </div>
        <div className='mx-auto container'>
          <h1 className='text-blue-100 text-4xl font-bold text-center '>Welcome to PEPE SUI NFT</h1>
          <h3 className='text-blue-100 text-xl'>The first and original PEPE SUI NFT on the SUI network 🐸</h3>
          <br />
          <p className='text-blue-100 mb-1'>This is a free minting NFT PEPE program on the SUI network for PEPE.sui holders</p>

          <p className='text-blue-100 mb-1'>After our recent successful launch on the BSC network, we are preparing for our migration to the SUI network. To make this even more special, we have prepared the first SUI network PEPE NFTs as a gift for all our holders. As one of the first NFTs on the network, your asset will be very rare and will forever be marked in SUI network history. 🚀</p>
        </div>

        <div className='text-center justify-center border-cyan-900 border-2 rounded-md md:container mt-5'>
          <h2 className='text-cyan-900 mb-1 text-2xl font-mono px-5 py-5'>COLLECTION DETAILS:</h2>
          <div className='flex flex-nowrap justify-center items-center'>
            <div className='p-5 text-cyan-900 text-left'>
              <p><b>NETWORK:</b> SUI</p>
              <p><b>COLLECTION NAME:</b> PEPE</p>
              <p><b>SUPPLY:</b> 420 NFT</p>
              <p><b>PRICE:</b> Free</p>
              <p><b>MAX PER WALLET:</b> 1</p>
              <p><b>ALLOWLIST:</b> Yes <span className="font-serif">(gas war)</span></p>
            </div>

            <div className='p-5 text-cyan-900 text-center'>
              <img className='h-60' src="./assets/img/nft.gif" alt='PEPE.sui NFT OFICIAL' title='PEPE NFT MODEL' />
            </div>
          </div>
        </div>

        <a className='mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded animate-bounce' href="./program">🔥 JOIN 🔥</a>
      </div>
    </>
  );
};

export default Home;
