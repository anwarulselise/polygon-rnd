const ethers = require("ethers");
const fs = require('fs');

// generates multiple wallets offline and writes wallet credentials in json file

function generateCryptoWallets(packName, walletCount ) {
    let cryptoWallets = {}
let addressList = [];

packName = packName + '.json';

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
    console.log("JSON data is saved for " + packName + " pack");
});

}


// read data from json file
async function readFile(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(data));
      });
    });
  }


module.exports = {generateCryptoWallets, readFile};













