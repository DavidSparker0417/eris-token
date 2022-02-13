import React from 'react'
import {
  ConnectionRejectedError,
  UseWalletProvider,
  useWallet,
} from 'use-wallet'

export default function TestWallet() {
  const wallet = useWallet()
  return (
    <>
      <h1>use-wallet</h1>
      <button onClick={() => wallet.connect('walletconnect')}>
        ConnectWallet
      </button>
    </>
  )
}

