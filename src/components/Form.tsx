/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import styles from '../styles/Home.module.css';
import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { WalletProvider } from '@suiet/wallet-kit';
import {
    ConnectButton,
    useAccountBalance,
    useWallet,
    SuiChainId,
    ErrorCode,
    formatSUI
} from "@suiet/wallet-kit";
import '@suiet/wallet-kit/style.css';
import { TransactionBlock, fromB64 } from '@mysten/sui.js';
import { useAccount } from 'wagmi'
import toast, { Toaster } from 'react-hot-toast';
import { Client } from 'faunadb';
import { query as q } from 'faunadb';

const Form: NextPage = () => {
    const fauna = new Client({
        //secret: "fnAE6ZauckAAV6UNH1oPOCnT2QSBeiDb1zKHKcRL"
        secret: "fnAFDDEyKvAAzlg9oGar0Po0ObQ4QQS2B0T-kbKs"
    });

    const [isWalletConfirmed, setIsWalletConfirmed] = useState<boolean>(false);
    const { address: bscWalletAddress } = useAccount();

    const wallet = useWallet();
    const { balance } = useAccountBalance();

    const pepeNft = new Map([
        ['sui:devnet', '0x37b32a726c348b9198ffc22f63a97cb36c01f257258af020cecea8a82575dd56::nft::mint'],
        ['sui:testnet', '0x57c53166c2b04c1f1fc93105b39b6266cb1eccbe654f5d2fc89d5b44524b11fd::nft::mint'],
    ])

    async function verifyWalletBsc(wallet_address: any): Promise<boolean>{

        const notification = toast.loading("Please wait, we are checking...", { duration: 4000 })

        try {
            const doesExist = await fauna.query(q.Exists(q.Match(q.Index("all_wallets"), wallet_address)));

            if (doesExist) {
                toast("⚠️ Your wallet has already been added, wait until the snapshot day!", {
                    duration: 5000,
                    id: notification
                });

                return true
            } else {
                toast.error("Your wallet not add!", {
                    id: notification,
                });

                return false
            }
        } catch (err) {
            toast.error("Whoops something went wrong!", {
                id: notification,
            });

            console.error("contract call failure", err);

            return false
        }
    }

    function uint8arrayToHex(value: Uint8Array | undefined) {
        if (!value) return ''
        // @ts-ignore
        return value.toString('hex')
    }

    const handleButtonClick = async (suiWallet: any, bscWallet: any) => {

        const notification = toast.loading("Please wait, we are checking...", { duration: 4000 })

        try {

            const doesExist = await fauna.query(q.Exists(q.Match(q.Index("all_wallets"), bscWallet)));

            console.log("doesExist", doesExist)

            if (doesExist) {

                toast("⚠️ Your wallet has already been added, wait until the snapshot day!", {
                    duration: 5000,
                    id: notification
                });

                /* const confirmedAddressList = localStorage.getItem("walletConfirmed");
                localStorage.setItem("walletConfirmed", `${confirmedAddressList}, ${bscWallet}`);
                setIsWalletConfirmed(true); */
            } else {
                const data = await fauna.query(q.Create(q.Collection("allowlist"), { data: { "bsc_address": bscWallet, "sui_address": suiWallet } }));

                toast.success("Your wallet has been successfully added!", {
                    id: notification
                });

                console.info("save call success", data);

                const confirmedAddressList = localStorage.getItem("walletConfirmed");
                localStorage.setItem("walletConfirmed", `${confirmedAddressList}, ${bscWallet}`);
                setIsWalletConfirmed(true);
            }
        } catch (err) {
            toast.error("Whoops something went wrong!", {
                id: notification,
            });

            console.error("contract call failure", err);
        }
    }

    /*
    async function handleExecuteMoveCall(target: string | undefined) {
        if (!target) return;

        try {
            const tx = new TransactionBlock()
            tx.moveCall({
                target: target as any,
                arguments: [
                    tx.pure('Suiet NFT'),
                    tx.pure('Suiet Sample NFT'),
                    tx.pure('https://xc6fbqjny4wfkgukliockypoutzhcqwjmlw2gigombpp2ynufaxa.arweave.net/uLxQwS3HLFUailocJWHupPJxQsli7aMgzmBe_WG0KC4')
                ]
            })
            const resData = await wallet.signAndExecuteTransactionBlock({
                transactionBlock: tx,
            });
            console.log('executeMoveCall success', resData);
            alert('executeMoveCall succeeded (see response in the console)');
        } catch (e) {
            console.error('executeMoveCall failed', e);
            alert('executeMoveCall failed (see response in the console)');
        }
    }

    async function handleSignMsg() {
        try {
            const msg = 'Hello world!'
            const msgBytes = new TextEncoder().encode(msg)
            const result = await wallet.signMessage({
                message: msgBytes
            })
            const verifyResult = wallet.verifySignedMessage(result)
            console.log('verify signedMessage', verifyResult)
            if (!verifyResult) {
                alert(`signMessage succeed, but verify signedMessage failed`)
            } else {
                alert(`signMessage succeed, and verify signedMessage succeed!`)
            }
        } catch (e) {
            console.error('signMessage failed', e)
            alert('signMessage failed (see response in the console)')
        }
    } */

    useEffect(() => {
        verifyWalletBsc(bscWalletAddress)
        .then((resp) => {
            console.log(resp);
            setIsWalletConfirmed(resp);
        })
        .catch((err) => {
            console.log(err);
            setIsWalletConfirmed(false);
        })
        /* if (verify) {
            setIsWalletConfirmed(true);
        }else{
            setIsWalletConfirmed(false);
        } */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bscWalletAddress]);

    return (
        <div className='container mx-auto'>
            <div className='text-center justify-center border-cyan-900 border-2 rounded-md w-full min-w-max'>
                <div className="px-5 py-5 flex items-center text-center mx-auto justify-center">
                    <img className='h-10 mr-2 text-center' src="https://s2.coinmarketcap.com/static/img/coins/64x64/20947.png" />
                    <h1 className="font-bold text-white text-2xl text-center">SUI Network</h1>
                </div>

                {!isWalletConfirmed ?
                    <>
                        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 items-center py-5 px-5">
                            <div className="text-center mx-auto">
                                <ConnectButton
                                    onConnectError={(error) => {
                                        if (error.code === ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED) {
                                            console.warn('user rejected the connection to ' + error.details?.wallet)
                                        } else {
                                            console.warn('unknown connect error: ', error)
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        {!wallet.connected ? (
                            <p className="px-5 py-5 ">Connect your SUI wallet to register!</p>
                        ) : (
                            <div className=''>
                                {/* <div>
                                <p>current wallet: {wallet.adapter?.name}</p>
                                <p>
                                    wallet status:{' '}
                                    {wallet.connecting
                                        ? 'connecting'
                                        : wallet.connected
                                            ? 'connected'
                                            : 'disconnected'}
                                </p>
                                <p>wallet address: {wallet.account?.address}</p>
                                <p>current network: {wallet.chain?.name}</p>
                                <p>wallet balance: {formatSUI(balance ?? 0, {
                                    withAbbr: false
                                })} SUI</p>
                                <p>wallet publicKey: {uint8arrayToHex(wallet.account?.publicKey)}</p>
                            </div> */}
                                <div>
                                    <button className="px-5 py-5 bg-cyan-900 hover:bg-cyan-900/80 mt-5 rounded-sm font-bold w-full" onClick={() => handleButtonClick(wallet.account?.address, bscWalletAddress)}>SUBMIT</button>
                                    {/* {wallet.chain?.id === SuiChainId.TestNET ? (
                                    <button onClick={() => handleExecuteMoveCall(pepeNft.get('sui:testnet'))}>Testnet Mint NFT</button>
                                ) : (
                                    <button onClick={() => handleExecuteMoveCall(pepeNft.get('sui:devnet'))}>Devnet Mint NFT</button>
                                )} */}
                                    {/* <button onClick={handleSignMsg}>signMessage</button> */}
                                </div>
                            </div>
                        )}
                    </>
                    :
                    <>
                        <div className='text-center justify-center w-full'>
                            <div className='p-5'>
                                <h1 className="text-4xl font-bold mb-2">Congratulations 🚀</h1>
                                <p>
                                    Your first mission on PEPE SUI has been completed 💪 <br />
                                    {/*  Now share it on twitter and click claim your reservation.<br /> */}
                                </p>
                            </div>
                        </div>
                    </>
                }
            </div>
            <Toaster />
        </div>

    );
}

export default Form;
