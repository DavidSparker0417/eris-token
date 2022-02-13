import PropTypes from "prop-types";
import { Card } from "@mui/material";
import SuiBox from "components/SuiBox"
import SuiTypography from "components/SuiTypography";
import { numberWithCommas, truncateDecimals } from "./utils";

function StakingInfo({title, value, fw}) {
  return(
    <SuiBox justifyContent="space-between" display="flex" px="2rem">
      <SuiTypography variant={fw} pb={3}>{title}</SuiTypography>
      <SuiTypography variant={fw}>{value}</SuiTypography>
    </SuiBox>
  )
}

StakingInfo.defaultProps = {
  fw: "body2"
}

StakingInfo.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  fw: PropTypes.string
}

export default function ErisStatisticsTable({info}) {
  return(
    <Card sx = {{ my: "2rem" }}>
      <SuiBox 
        display="flex" 
        p={3} 
        justifyContent="center" 
        sx = {{ borderBottom:"1px solid #dee2e6", mb:"2rem"}}>
          <SuiTypography fontWeight="bold">Account Statistics</SuiTypography>
      </SuiBox>
      <StakingInfo title = "Current APY:" value = {numberWithCommas(info.apy)} fw="h4"/>
      <StakingInfo title = "Wallet Balance:" value = {numberWithCommas(truncateDecimals(info.walletBalance, 5))}/>
      <StakingInfo title = "Next Reward Amount:" value = {numberWithCommas(truncateDecimals(info.nrAmount, 7))}/>
      <StakingInfo title = "Next Reward Yield:" value = {numberWithCommas(info.nrYield)}/>
      <StakingInfo title = "ROI(5-Day Rate):" value = {numberWithCommas(truncateDecimals(info.roi, 4))}/>
    </Card>
  )
}