import PropTypes from "prop-types";
import brand from "assets/images/brand.png";

import Grid from "@mui/material/Grid";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";

import { connectWallet } from "./TokenInterface";
import { useEffect, useState } from "react";
import { useWallet } from 'use-wallet';
import { isMobile } from 'react-device-detect';

export function ErisAvata({title, icon, fw}) {
  return (
    <Grid 
      className= "eris-avata"
      container 
      
      alignItems="center" 
      spacing={2}
      sx={{ width:"fit-content" }}
    >
      <Grid item>
        <SuiBox component="img" src={icon} alt={title} />
      </Grid>
      <Grid item xs={0}>
        <SuiTypography 
          variant={fw} fontWeight="bold">
            {title}
        </SuiTypography>
      </Grid>
    </Grid>
  );
}

ErisAvata.propTypes = {
  title : PropTypes.string.isRequired,
  icon  : PropTypes.node.isRequired,
  fw    : PropTypes.string.isRequired
}

ErisAvata.defaultProps = {
  fw    : ""
}

export default function ErisTitle({chainId, wallet}) {
  // const wallet = useWallet();
  const [walletButtonTitle, setWalletButtonTitle] = useState("Connect Wallet")

  async function handleConnectWallet() {
    if (isMobile) {
      wallet.connect('walletconnect');
    } else {
      const chainStr = '0x' + chainId.toString(16);
      await connectWallet(chainStr);
      wallet.connect();
    }
  }
  
  useEffect(() => {
    if (wallet.status === "connected") {
      setWalletButtonTitle(wallet.account.substr(2, 4) + "..." + wallet.account.substr(-4, 4));
    }
    else {
      setWalletButtonTitle("Connect Wallet")
    }
  }, [wallet.status]);

  useEffect(() => {
    console.log(wallet.account);
  }, []);
  
  return (
    <SuiBox>
      <SuiBox display="flex" justifyContent="end" pt={1}>
        <SuiButton
          color="info"
          variant="gradient"
          onClick = {() => handleConnectWallet()}
          sx = {{ px:"0.5em" }}
        >
            {walletButtonTitle}
        </SuiButton>
      </SuiBox>
      <ErisAvata title="Eris.Finance" icon={brand} fw="h2"/>
    </SuiBox>
  )
}
