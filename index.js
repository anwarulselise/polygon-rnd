const lib = require('./crypto-lib');
const gasTransaction = require('./gas-recharge-multiple');


const privateKey = "";
const publicAddress = "";
const polygonUrl = "https://polygon-mumbai.g.alchemy.com/v2/7K346rg1key-16dbuyO7d5kLu3plVACq";
const chainID = 80001;
const filePath = "";
const packname = "";
const count = 0;

lib.generateCryptoWallets(packname, count);


gasTransaction.sendGas(polygonUrl, chainID, filePath, privateKey, publicAddress, 1);

