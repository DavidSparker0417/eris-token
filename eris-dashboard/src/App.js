import { useState, useEffect, useRef, useMemo } from "react";
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
import ErisPairAbi from "contracts/Eris2BNB.json";
import { RPC_NODES, SM_DEPLOY } from "./bc-global";

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
  const timer = useRef();
  const wallet =  useWallet();

  // On initial page load 
  useEffect(() =>{
    pageRefresh();
    log("[ERIS] Page initialized!!");

    return(() =>{
      clearTimeout(timer.current.timerId);
    });
  }, []);

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
  async function pageRefresh() {
    log("[ERIS] Page refreshing... walletState = ", wallet);
    // get web3 provider
    const web3Provider = tokenGetWeb3Provider();
    if (web3Provider === null)
    {
      log("[ERIS](pageRefresh) Cannot get web3 provider...");
      timer.current = setTimeout(pageRefresh, REFRESH_INTERVAL);
      return;
    }
    // get token price;
    const erisToken = tokenGetContract(ERIS_TOKEN_ADDRESS, ErisTokenAbi.abi);
    const tokenPrice = (await tokenGetPrice(erisToken, ErisPairAbi, BUSD_TOKEN_ADDRESS)).toFixed(6);
    // get marketing cap
    const market = (await tokenGetMarketCap(erisToken, MARKETING_FACTOR)).toFixed(0);
    // calculate apy
    const apy = (CalculateRewardsCustom(MIN_PER_YEAR) * 100).toFixed(2);
    // set ui data of main face
    setTokenInfo({price: tokenPrice, marketCap:market, apy:apy});
    // get wallet info
    const walletBalance = await tokenWalletBalance(web3Provider, erisToken);
    // calculate return funds info
    const nextReward = CalculateRewardsCustom(REBASE_FREQ) - 1;
    const nextRewardAmount = nextReward * walletBalance;
    const nextRewardYield = (nextReward * 100).toFixed(5);
    const roi = (CalculateRewardsCustom(MIN_PER_DAY*5) - 1) * 100;
    // set ui data of statisics
    setStkStat({apy:apy, walletBalance:walletBalance, nrAmount: nextRewardAmount, nrYield: nextRewardYield, roi: roi});
    // end of refresh
    clearTimeout(timer.current);
    timer.current = setTimeout(pageRefresh, REFRESH_INTERVAL);
  }

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
