const ethers = require("ethers");
const fs = require('fs');
const process = require('process');

let cryptoWallets = {}
let addressList = [];


const packName = process.argv[2] + '.json';
const walletCount = process.argv[3]; 

for (let i = 0; i < walletCount; i++) {
    const wallet = new ethers.Wallet.createRandom();
    const jsonWallet = {
        "PrivateKey": wallet.privateKey,
        "PublicAddress": wallet.address
    }
    addressList = [...addressList, jsonWallet ];
}
cryptoWallets.AddressList = addressList;

const data = JSON.stringify(cryptoWallets, null, 4);

// write JSON string to a file
fs.writeFile(packName, data, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved for " + process.argv[2] + " pack");
});


