import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useWallet } from "use-wallet";

import env from 'dotenv';
import "./eris.css";
import "./eris-mobile.css";
import theme from "assets/theme";
import IconTokenState from 'assets/images/token-state.svg';
import BackgroundImg from 'assets/images/background.png';
import { ThemeProvider } from "@mui/material/styles";
import SuiBox from "components/SuiBox";
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";

import { ErisAvata } from 'eris-components/ErisTitle';
import ErisTitle from "eris-components/ErisTitle";
import ErisMainFace from "eris-components/ErisMainFace";
import ErisStatisticsTable from "./eris-components/ErisStatistics";
import ListMainMenu, {MainMenuForMobile} from "./eris-components/ListMainMenu";
import TokenCalulator from "./eris-components/TokenCalculator";
import { log } from "./eris-components/utils";
import { 
  REBASE_FREQ,
  MIN_PER_DAY,
  MIN_PER_YEAR,
  MARKETING_FACTOR,
  tokenGetContract,
  tokenGetPrice, 
  tokenGetMarketCap, 
  CalculateRewardsCustom,
  tokenWalletBalance,
  tokenGetWeb3Provider,
  tokenGetRebaseRemaining } from "./eris-components/TokenInterface";
import ErisTokenAbi from "contracts/ERIS.json";
// import ErisPairAbi from "contracts/Eris2BNB.json";
import { RPC_NODES, SM_DEPLOY } from "./bc-global";
import {dsWeb3GetContract, dsWeb3GetTokenBalance} from './dslib/ds-web3'
import { erisApy, erisGetBalance, erisGetMarketCap, erisGetPrice, ERIS_REBASE_FREQ } from "./eris-components/eris-token";
import { toHumanizeFixed } from "dslib/ds-utils";

const REFRESH_INTERVAL = 1000;
const ERIS_TOKEN_ADDRESS  = SM_DEPLOY.contract.bsctst;
//const BUSD_TOKEN_ADDRESS  = "0xe9e7cea3dedca5984780bafc599bd69add087d56"; // bsc mainnet
const BUSD_TOKEN_ADDRESS  = "0x9fa4fe8a0b1e621847c729cd3a6d9da9f642728f"; // bsc testnet

export default function App({chainId}) {

  const [tokenInfo, setTokenInfo] = useState({
    price:        0,
    marketCap :   0,
    apy:          0,
  });
  const [stkStat, setStkStat] = useState({
    apy           :0,
    walletBalance :0,
    nrAmount      :0, 
    nrYield       :0,
    roi           :0
  });
  const [rebaseRemain, setRebaseRemain] = useState(0);
  const wallet =  useWallet();

  // Rebase remain time downcount
  useEffect(() => {
    let testRebaseInterval = 0;
    if (rebaseRemain === 0 && wallet.isConnected())
      getRebaseRemaining().then((r) => {setRebaseRemain(r)});
    else if (rebaseRemain > 0)
      testRebaseInterval = setInterval(()=> setRebaseRemain(rebaseRemain-1), 1000);
    return() => clearInterval(testRebaseInterval);
  }, [rebaseRemain, wallet.status]);

  // get rebase remaining value from contract
  async function getRebaseRemaining() {
    const erisToken = tokenGetContract(ERIS_TOKEN_ADDRESS, ErisTokenAbi.abi);
    return await tokenGetRebaseRemaining(erisToken);
  }

  // refreshing overall page information
  const refresh = useCallback(async () => {
    log("[ERIS] Page refreshing...");
    const provider = wallet._web3ReactContext.library
    const balance = await  erisGetBalance(provider)
    const price = await erisGetPrice()
    const marketCap = await erisGetMarketCap()
    const apy =  toHumanizeFixed(erisApy(MIN_PER_YEAR)*100)
    const nextReward = erisApy(ERIS_REBASE_FREQ) - 1;
    const nextRewardAmount = nextReward * balance;
    const nextRewardYield = toHumanizeFixed(nextReward * 100);
    const roi = (erisApy(MIN_PER_DAY*5) - 1) * 100;
    console.log("++++++ roi = ", roi)
    setTokenInfo({
      price: price, 
      marketCap:marketCap, 
      apy:apy
    });
    setStkStat({
      apy:apy, 
      walletBalance:balance, 
      nrAmount: nextRewardAmount, 
      nrYield: nextRewardYield, 
      roi: roi});
  }, [wallet.account])

  useEffect(() => {
    log("+++++++++ Initial loading ++++++++++")
    let ac = new AbortController()
    const callRefresh = async () => {
      refresh().then(() => {
        if (ac.signal.aborted === false) {
          setTimeout(() => callRefresh(), REFRESH_INTERVAL)
        }
      })
    }

    callRefresh()
    return () => ac.abort()
  }, [refresh])

  return (
    <ThemeProvider theme={theme}>
      <SuiBox component="img" src={BackgroundImg} position="fixed" width="100%" height="100%" alt="bkground"></SuiBox>
      <SuiBox mx={2} position="relative">
        <ErisTitle className= "brand" chainId={chainId} wallet={wallet}/>
        <Grid container mt={3} spacing={2}>
          <Grid className= "eris-navbar" item xl={2} xs={0}>
            <Card className= "eris-sidenav" sx= {{ mt: "2.4rem" }}>
              <ListMainMenu />
            </Card>
          </Grid>
          <Grid className= "eris-main" item xl={6} xs={12}>
            <SuiBox display="flex" justifyContent="center" mb={1}>
              <ErisAvata title="Token State" icon= {IconTokenState} fw="h6"/>
            </SuiBox>
            <ErisMainFace 
              binanceInfo={tokenInfo}
              rebaseReamin={rebaseRemain}
            />
            <ErisStatisticsTable info={stkStat}/>
          </Grid>
          <Grid className= "eris-calculator" item  xl={4} xs={12}>
            <TokenCalulator price= {tokenInfo.price} balance={stkStat.walletBalance}/>
          </Grid>
        </Grid>
      </SuiBox>
      <MainMenuForMobile />
    </ThemeProvider>
  );
}
