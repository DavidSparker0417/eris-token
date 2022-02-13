/**
=========================================================
* Soft UI Dashboard React - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import {UseWalletProvider} from 'use-wallet';
import App from "App";
import {DEST_NET} from "./eris-components/TokenInterface";

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";

ReactDOM.render(
  <UseWalletProvider 
      autoConnect
      chainId = {DEST_NET.chainId}
      connectors={{
        injected: {
          chainId: [DEST_NET.chainId,],
        },
        walletconnect: {
          rpc: {
            97: DEST_NET.url
          },
          bridge: 'https://bridge.walletconnect.org',
          pollingInterval: 12000,
        }
      }}
    >
  <SoftUIControllerProvider>
    <App chainId={DEST_NET.chainId} />
  </SoftUIControllerProvider>
  </UseWalletProvider>,
  document.getElementById("root")
);
