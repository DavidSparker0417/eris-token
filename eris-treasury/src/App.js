import './App.css';
import { useEffect, useRef, useState } from 'react';
import Button from 'mui-button';
import { Input } from '@material-ui/core';
import web3 from 'web3';
import {ethers} from 'ethers';
import BN from 'bignumber.js';

import ErisTreasuryAbi from './contracts/ErisTreasury.json';
import ErisAbi from './contracts/ERIS.json';
import { SM_DEPLOY, RPC_NODES } from "./bc-global";
import { 
  ethersGetContract,
  web3GetSignedContract, 
  web3GetProvider, 
  web3GetContract,
  web3GetCurrentAccount } from "./ds-web3";

const eBN = web3.utils.BN;
const DIRECT_MODE      = true;
const STOPPED          = 0;
const STARTED          = 1;
const REBASE_INTERVAL  = 1000;
const REBASE_FACTOR    = 0.0003958;
const CURRENT_NET      = RPC_NODES.bsc_test.url;
const ERIS_TEASURY_ADDR  = SM_DEPLOY.contract.bsctst;
const ERIS_TOKEN_OWNER = SM_DEPLOY.david.address;
const PRIVATE_KEY      = SM_DEPLOY.david.private;

const log = console.log;
function App() {
  const [rebaseState, setRebaseState] = useState(STOPPED);
  const [tokenAddress, setTokenAddress] = useState("0x47156ed0BaC32810785F851d227ddbc95d4c1A28");
  const [epoch, setEpoc] = useState(0);
  const [logStr, setLogStr] = useState("");
  const [btnDisable, setBtnDisable] = useState(false);
  const timer = useRef();

  useState(() => {
    return() => clearTimeout(timer.current);
  }, []);

  async function handleSetToken() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ERIS_TEASURY_ADDR, ErisTreasuryAbi.abi, signer);
    // const contract = ethersGetContract(ERIS_TEASURY_ADDR, ErisTreasuryAbi.abi, true);
    try {
      const transaction = contract.setTargetToken(tokenAddress).send();
      const transactionHash = await transaction.wait();  
      console.log("[Treasury] Set target token successfully. hash = ", transactionHash);
    } catch (err) {
      console.log("[Treasury] Set target token error.");
    }
  }

  async function rebaseByTreasury() {
    if (rebaseState === STOPPED) { 
      console.log("Rebasing...");
      setRebaseState(STARTED);
      await doRebase();
      // restart this function after a certain interval
      timer.current = setTimeout(doRebase, REBASE_INTERVAL);
    }
    else {
      setRebaseState(STOPPED);
      clearTimeout(timer.current);
    }
  }

  async function rebaseDirectly() {
    setLogStr("Rebasing...");
    setBtnDisable(true);
    // get tottal supply
    const contract = web3GetContract(ErisAbi.abi, tokenAddress);
    const totalSup = await contract.methods.totalSupply().call();
    let newSupply = new BN(totalSup);
    newSupply = newSupply.times(REBASE_FACTOR).toFixed(0);
    
    // send rebase with new supply
    const account = await web3GetCurrentAccount();
    if (typeof account === 'undefined') {
      setLogStr("Please login wallet.")
      setBtnDisable(false);
      return;
    }
    const transaction = contract.methods.rebase(epoch, newSupply)
      .send({from:account})
    
    await transaction.then(function(receipt) {
      const restulStr = "Done";
      setLogStr(restulStr);
    })
    .catch(function(err) {
      setLogStr(err.message);
    })
    setBtnDisable(false);
  }

  async function handleRebase() {
    if (DIRECT_MODE)
      rebaseDirectly();
    else
      rebaseByTreasury();
  }

  async function doRebase() {
    console.log("[ERIS](Treasury) Rebasing...");
    const contract = web3GetSignedContract(CURRENT_NET, PRIVATE_KEY, ErisTreasuryAbi.abi, ERIS_TEASURY_ADDR);
    
    // request transaction
    const transaction = contract.methods.rebase().send({from: ERIS_TOKEN_OWNER});
    await transaction.then((result) => {
      log("[ERIS](Tearsury) Rebase has done successfuly. supplyDelta = ",
        result);
    }, reason => {
      log("[ERIS](Tearsury) Rebase transaction failed. err = %s",
        reason);
    });
  }
  return (
    <div className="App">
      <h1 style={{justifyContent:"center", display:"flex"}}>Eris Treasury </h1>
      <div className='container-tokenset' style={{height:"30px", display:"flex"}}>
        <div style={{textAlign:"right", width:"30%"}}><
          h3 style={{display:"contents"}}>Eris Token address: </h3>
        </div>
        <Input 
          fullWidth
          placeholder='Enter target token contract address...' 
          inputProps={{style:{textAlign:'center'}}}
          value = {tokenAddress}
          onChange={({target}) => setTokenAddress(target.value)}
          />
        {()=> {
          if(!DIRECT_MODE)
            return(
              <Button onClick = {handleSetToken} style={{width:"10%"}}>
                Set
              </Button>
          )
        }}
      </div>
      <div className='container-tokenset'>
        <Button 
          color= {rebaseState === STOPPED ? "primary" : "secondary"}
          disabled={btnDisable}
          onClick = {handleRebase}>
          {rebaseState === STOPPED ? "Rebase" : "Stop"}
        </Button>
      </div>
      <div className='log-box'>
        <h5>{logStr}</h5>
      </div>
    </div>  
  );
}

export default App;
