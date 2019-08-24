let HDWalletProvider = require("truffle-hdwallet-provider");

//https://developers.skalelabs.com for SKALE documentation
//Provide your wallet private key
let privateKey = "0x26b9f98a570710a122995981a280d80251e396877fa79afbfe1a4944212c6cc4";

//Provide your SKALE endpoint address
let skale = "https://165.22.137.3:10183";

module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    skale: {
      provider: () => new HDWalletProvider(privateKey, skale),
      gasPrice: 0,
      network_id: "*"
    }
  }
}
