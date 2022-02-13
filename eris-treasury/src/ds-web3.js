import {ethers} from 'ethers';
import Web3 from 'web3';
import Web3Contract from 'web3-eth-contract';
import HDWalletProvider from '@truffle/hdwallet-provider';

export const BSC_CHAIN           = '0x38'
export const ROPSTEN_CHAIN       = '0x3'
export const RINKEBY_CHAIN       = '0x4'
export const LOCAL_CHAIN         = "0x539"

/***************************************/
/*          wallet functions           */
/***************************************/
export async function conntectWallet(chainId) {
  if (!window.ethereum)
  {
      alert("Metamask is not installed.")
      return;
  }

  try {
      await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainId }],
      });
      const[account] = await window.ethereum.request({method: 'eth_requestAccounts'});
      return account;
  } catch (err) {
      alert(err.message);
  }
}

export async function walletGetActiveNet() {
  if (!window.ethereum)
  {
      alert("Metamask is not installed.")
      return null;
  }

  
}

/***************************************/
/*          ethers web3 functions      */
/***************************************/
// get web3 provider
export function ethersGetWeb3Provider() {
  if (!window.ethereum)
  {
      alert("Metamask is not installed.")
      return null;
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return provider;
}

// get contract object 
export function ethersGetContract(addr, abi, isTrReq) {
  if (!window.ethereum)
  {
      alert("Metamask is not installed.")
      return;
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  let contract;
  if (isTrReq === true)
  {
      const signer = provider.getSigner();
      contract = new ethers.Contract(addr, abi, signer);
  } else {
      contract = new ethers.Contract(addr, abi, provider);
  }
  return contract;
}

/***************************************/
/*          web3.js  functions         */
/***************************************/
export function web3GetSignedContract(chainId, privateKey, contractAbi, contractAddr) {
  const provider = new HDWalletProvider(privateKey, chainId);
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(contractAbi, contractAddr);
  return contract;
}

export function web3GetProvider() {
  const web3 = new Web3(window.web3.currentProvider);
  // const web3 = new Web3(window.ethereum);
  return web3;
}

// get web3 contract
export function web3GetContract(abi, address) {
  // Web3Contract.setProvider(window.web3.currentProvider);
  // const contract = new Web3Contract(abi, address);
  const web3 = new Web3(window.web3.currentProvider);
  const contract = new web3.eth.Contract(abi, address);
  return contract;
}

// get current account of metamask
export async function web3GetCurrentAccount() {
  const web3 = new Web3(window.web3.currentProvider);
  const accounts = await web3.eth.getAccounts();
  return accounts[0];
}
