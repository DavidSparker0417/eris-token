export const SM_DEPLOY = {
  contract : {
    local   : "0x3a2226B854996Ae5062BdEE3fc8E79886c1E84a5",
    ropsten : "0x23721F2f3606fFC8b969D4a0fcFf68941fB29F47",
    bsctst  : "0x23420f27964FBd653f807CE212010EaEd82e1A7a",
  },
}

export const RPC_NODES = {
  ether : {
    chainId : 1,
    url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  },
  ropsten : {
    chainId : 3,
    url: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  },
  rinkeby : {
    chainId : 4,
    url: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  },
  bsc : {
    chainId : 56,
    url: "https://bsc-dataseed1.ninicoin.io",
  },
  bsc_test : {
    chainId : 97,
    url: "https://speedy-nodes-nyc.moralis.io/bfaf7a5a5cd9975318f411e4/bsc/testnet",
  },
  local : {
    chainId : 539,
    url : "http://localhost:8545",
  },
};