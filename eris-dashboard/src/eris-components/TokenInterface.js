import {ethers} from 'ethers';
import {RPC_NODES} from 'bc-global';

export const DEST_NET = RPC_NODES.bsc_test;
export const MIN_PER_DAY        = 1440
export const MIN_PER_YEAR       = MIN_PER_DAY * 365
export const ANNUAL_INTEREST     = 6.934635; // 6.97515
export const REBASE_FREQ         = 30; // 30 minute
export const NOCP                = (1440 * 365) / REBASE_FREQ;// Number Of Compound Period in the year
export const MARKETING_FACTOR   = 0.1047

const weiToEth = ethers.utils.formatEther
const TEST_MODE = 1;

/***************************************/
/*          interal functions          */
/***************************************/
// generate randomize number
function generateRandNum(rangeStart, rangeEnd) {
    return rangeStart + Math.random() * (rangeEnd - rangeStart);
}

/***************************************/
/*          wallet functions           */
/***************************************/
export async function connectWallet(chainId) {
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

export async function tokenWalletBalance(web3Provider, token) {
    // if (TEST_MODE) return generateRandNum(1, 500);
    if (typeof web3Provider === "undefined" || 
        typeof token === "undefined")
    {
      return 0;
    }
    try {
      const signer = web3Provider.getSigner(); // user
      const contractUser = await signer.getAddress();
      const tokenBalance = await token.balanceOf(contractUser);
      const balance = weiToEth(tokenBalance)
      return balance;
    } catch(err) {
      console.log("[ERIS](getWalletBalance) Getting wallet balance error!", err.message);
    }
    return 0;
}

export async function walletGetConnectedChain() {

}
  
/***************************************/
/*          web3 functions             */
/***************************************/
export function tokenGetWeb3Provider() {
    if (!window.ethereum)
    {
        // alert("Metamask is not installed.")
        return null;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider;
}

export function tokenGetContract(tokenAddr, abi) {
    if (!window.ethereum)
    {
        // alert("Metamask is not installed.")
        return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return new ethers.Contract(tokenAddr, abi, provider);
}

export function ethersGetContract(addr, abi, isTrReq) {
    if (!window.ethereum)
    {
        // alert("Metamask is not installed.")
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
/*          export functions           */
/***************************************/
export function APY()
{
    return ((1 + ANNUAL_INTEREST/NOCP)**NOCP) - 1;
}

export function CalculateAPY(duringAfter) {
    const n = duringAfter / REBASE_FREQ;
    const r = ANNUAL_INTEREST;
    return ((1 + r/NOCP)**n) - 1;
}

export function CalculateRewardsCustom(duringAfter) {
    // T = (1 + a / n)^(n*m)
    const a = 13189284e-12;
    const n = duringAfter / REBASE_FREQ;
    const m = duringAfter;
    
    return (1 + a / n)**(n*m);
}

export async function tokenGetPrice(tokenContract, pairAbi, stableCoinAddr) {
    let pairContractAddr;
    if (TEST_MODE) return generateRandNum(0.8, 2);
    // get pair contract address
    try {
        pairContractAddr = await tokenContract.pairContract();
    } catch (err) {
        console.log("[ERIS] Error gettting pair contract address.");
    }
    // get token price
    const contract = new ethers.Contract(pairContractAddr, pairAbi, provider);
    try {
        const [, priceInWei] = await contract.getAmountsOut(
            ethers.utils.parseUnits("1.0"), 
            [tokenAddr, stableCoinAddr]);
        return parseFloat(weiToEth(priceInWei));
    } catch(err) {
        console.log("[ERIS](tokenGetPrice) Error getting price...");
    }
    return null;
}

export async function tokenGetMarketCap(contract, marketingFactor) {
    if (TEST_MODE) return generateRandNum(1000000, 2000000);
    try {
        const totalSupply = weiToEth(await contract.totalSupply());
        return totalSupply * marketingFactor;
    } catch (err) {
        console.log("[ERIS](tokenGetMarketCap) Getting marketing cap error!");
    }
    return null;
}

export async function tokenGetRebaseRemaining(contract) {
    // if (TEST_MODE) return generateRandNum(0, 1800);
    try {
        const rebaseRemaining = await contract.remainToRabase();
        console.log("[ERIS] tokenGetRebaseRemaining RET:: ", rebaseRemaining.toNumber());
        return rebaseRemaining.toNumber();
    } catch(err) {
        console.log("[ERIS](tokenGetRebaseRemining) Geting rebase remain interval error.", err.message);
    }
    return 0;
}
