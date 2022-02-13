import { Grid } from "@mui/material";
import SuiBox from "components/SuiBox";
import IconPrice from "assets/images/price.png"
import IconMarketCap from "assets/images/market-cap.svg"
import IconApyChart from "assets/images/apy-chart.svg"
import IconRebase from "assets/images/rebase.svg"
import MiniStatisticsCard from "eris-components/MiniStatisticsCard";
import {secondToTimeFormatString, numberWithCommas} from "eris-components/utils";
import {useState, useEffect} from 'react';

export default function ErisMainFace({binanceInfo, rebaseReamin}) {
  return(
    <SuiBox>
      <Grid container spacing={3}>
        <Grid item xl={6} xs={12}>
          <MiniStatisticsCard
            title={{ text: "Token Price" }}
            count={`$ ${binanceInfo.price}`}
            icon={{ color: "info", component: IconPrice }}
          />
        </Grid> 
        <Grid item xl={6} xs={12}>
          <MiniStatisticsCard
            title={{ text: "Market Cap" }}
            count={numberWithCommas(binanceInfo.marketCap)}
            icon={{ color: "info", component: IconMarketCap }}
          />
        </Grid> 
        <Grid item xl={6} xs={12}>
          <MiniStatisticsCard
            title={{ text: "APY" }}
            count={numberWithCommas(binanceInfo.apy)}
            icon={{ color: "info", component: IconApyChart }}
          />
        </Grid> 
        <Grid item xl={6} xs={12}>
          <MiniStatisticsCard
            title={{ text: "Next Rebase" }}
            count={secondToTimeFormatString(rebaseReamin)}
            icon={{ color: "info", component: IconRebase }}
          />
        </Grid> 
      </Grid>
    </SuiBox>
  )
}