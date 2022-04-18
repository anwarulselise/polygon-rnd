const lib = require('./crypto-lib');
const gasTransaction = require('./gas-recharge-multiple');
const process = require('process');

const privateKey = "c0c786b9473490432ebf87ead394472d89f55a958f1b36a92a34d17010833b2a";
const publicAddress = "0xfE63903132e02768006B9f5434ecCbe2e68B3412";
const polygonUrl = "https://polygon-mumbai.g.alchemy.com/v2/7K346rg1key-16dbuyO7d5kLu3plVACq";
const chainID = 80001;
const filePath = process.argv[2];
const packname = process.argv[3];
const count = 0;

//lib.generateCryptoWallets(packname, count);


gasTransaction.sendGas(polygonUrl, chainID, filePath, privateKey, publicAddress, 0.001)
.catch((err) => console.log(err));

