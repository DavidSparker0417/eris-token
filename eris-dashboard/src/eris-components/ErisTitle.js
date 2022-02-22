import PropTypes from "prop-types";
import brand from "assets/images/brand.png";

import Grid from "@mui/material/Grid";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";

import { useEffect, useState } from "react";
import { dsWalletConnectInjected, dsWalletGetTrimedAccountName } from "../dslib/ds-web3";

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
    if (wallet.isConnected()) 
      return
    if (window.ethereum) {
      await dsWalletConnectInjected(chainId)
      wallet.connect()
    } else {
      wallet.connect('walletconnect');
    }
  }
  
  useEffect(() => {
    if (wallet.status === 'connecting')
      return;

    const btnName = wallet.account !== null 
      ? dsWalletGetTrimedAccountName(wallet.account)
      : "Wallet Connect" ;
    setWalletButtonTitle(btnName)
  }, [wallet.status]);

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
