import { dsBnEthToWei, dsBnWeiToEth, dsErrMsgGet, dsWeb3Get, dsWeb3GetContract, dsWeb3GetTokenBalance, dsWeb3GetTokenPrice } from "../dslib/ds-web3"
import erisJson from "../contracts/ERIS.json"
import routerAbi from "../contracts/router.json"

const TARGET_RPC = "https://speedy-nodes-nyc.moralis.io/bfaf7a5a5cd9975318f411e4/bsc/testnet"
const TOKEN_ADDRESS = "0x23420f27964FBd653f807CE212010EaEd82e1A7a"
//const BUSD_TOKEN_ADDRESS  = "0xe9e7cea3dedca5984780bafc599bd69add087d56"; // bsc mainnet
const BUSD_ADDRESS  = "0xae13d989dac2f0debff460ac112a837c89baa7cd"; // bsc testnet
const erisAbi = erisJson.abi
export const ERIS_MARKET_FACTOR   = 0.1047
export const ERIS_REBASE_FREQ     = 30

export async function erisGetBalance(provider) {
  if (typeof provider === 'undefined')
    return 0
  const contract = dsWeb3GetContract(provider, TOKEN_ADDRESS, erisAbi)
  const balance = await dsWeb3GetTokenBalance(contract, provider.selectedAddress)
  return balance
}

export async function erisGetPrice() {
  return dsWeb3GetTokenPrice(TARGET_RPC, TOKEN_ADDRESS, BUSD_ADDRESS)
}

export async function erisGetMarketCap() {
  let marketCap
  const contract = dsWeb3GetContract(TARGET_RPC, TOKEN_ADDRESS, erisAbi)
  await contract.methods.totalSupply().call()
    .then(function(recipent) {
      marketCap = recipent
    })
    .catch(function(error) {
      msg = dsErrMsgGet(error.message)
      console.log(msg)
    })
  return dsBnWeiToEth(marketCap)*ERIS_MARKET_FACTOR
}

export function erisApy(duringAfter) {
  // T = (1 + a / n)^(n*m)
  const a = 13189284e-12;
  const n = duringAfter / ERIS_REBASE_FREQ;
  const m = duringAfter;
  const apy = ((1 + a / n)**(n*m))
  return apy
}
