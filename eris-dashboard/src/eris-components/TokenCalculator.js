import { useEffect, useState } from 'react';
import IconCalc from 'assets/images/calculator.png';

import { Card } from "@mui/material";
import { TextField } from '@mui/material';

import SuiBox from 'components/SuiBox';
import SuiBadge from "components/SuiBadge";
import SuiInput from 'components/SuiInput';
import SuiTypography from 'components/SuiTypography';

import { CalculateRewardsCustom } from './TokenInterface';
import { ErisAvata } from 'eris-components/ErisTitle';
import SuiButton from 'components/SuiButton';

export default function TokenCalulator(props) {
  const [estmDuration, setEstmDuration] = useState(4);
  const [estmInp, setEstmInp] = useState("");
  const [estmEris, setEstmEris] = useState(0);
  const [estmUSD, setEstmUSD] = useState();
  const DURATIONS = [
    { id: 1, title: "7 dyas", minutes: 1440 * 7 },
    { id: 2, title: "1Month", minutes: 1440 * 30 },
    { id: 3, title: "6Months", minutes: 1440 * (365 / 2) },
    { id: 4, title: "1year", minutes: 1440 * 365 },
  ];

  useEffect(calculateEstimateRewards, [estmInp, estmDuration]);

  function handleEstimateValueChange({ target }) {
    setEstmInp(target.value.replace(/\D/, ''));
  }

  function calculateEstimateRewards() {
    if (estmInp === "")
      return;

    const dr = DURATIONS.find(element => element.id == estmDuration);
    const interest = CalculateRewardsCustom(dr.minutes) * parseFloat(estmInp);
    setEstmEris(interest.toFixed(3));
    setEstmUSD((interest * props.price).toFixed(2));
  }

  return (
    <>
      <SuiBox display="flex" justifyContent="center" mb={1}>
        <ErisAvata title="Reward Calculator" icon={IconCalc} fw="h6" />
      </SuiBox>
      <Card className="calculator">
        <SuiBox py={4} px={2}>
          <SuiTypography
            variant="h6"
            textAlign="center"
            fontWeight="bold"
            color="text"
            mb={2}
          >
            Estimate Your Returns
          </SuiTypography>
          <SuiBadge
              variant="gradient"
              color="primary"
              badgeContent="Current Balance"
              onClick={()=> setEstmInp(props.balance)}
              sx={{
                mb : "5px",
                cursor: "pointer",
                "&:hover, &:focus": {
                  zIndex: "10",
                },
                textTransform:"capitalize"
              }}
            ></SuiBadge>
          <SuiInput
            placeholder="Enter the Token amount here..."
            type="Number"
            value={estmInp}
            onChange={handleEstimateValueChange}
            inputProps={{ style: { textAlign: 'center' } }}
          />
          <SuiBox mt={1} display="flex" justifyContent="center">
            {
              DURATIONS.map((t) =>
                <SuiBadge
                  variant="gradient"
                  color={t.id == estmDuration ? "primary" : "secondary"}
                  badgeContent={t.title}
                  onClick={() => setEstmDuration(t.id)}
                  sx={{
                    cursor: "pointer",
                    "&:hover, &:focus": {
                      zIndex: "10",
                    },
                  }}
                  key={t.id}
                ></SuiBadge>
              )
            }
          </SuiBox>
          <SuiBox bgColor="grey-200" className="return-elem">
            <SuiTypography>$Eris Balance</SuiTypography>
            <SuiTypography>{estmEris}</SuiTypography>
          </SuiBox>
          <SuiBox bgColor="grey-200" className="return-elem">
            <SuiTypography>Total USD Balance</SuiTypography>
            <SuiTypography>$ {estmUSD}</SuiTypography>
          </SuiBox>
          <SuiTypography mt={5} fontSize={12}>
            Earnings calculated, indicate the scenario when the RFV Sustain the Rebase Reward for 365 days
          </SuiTypography>
          <SuiBox display="flex" justifyContent="center" mb={2}>
            <SuiButton
              component="a"
              href={"https://pancakeswap.finance/swap?outputCurrency=0xba96731324de188ebc1ed87ca74544ddebc07d7f"}
              target="_blank"
              variant="gradient"
              color="primary"
              sx = {{textTransform:"capitalize"}}
            >
              Swap $Eris
            </SuiButton>
          </SuiBox>
        </SuiBox>
      </Card>
    </>
  )
}