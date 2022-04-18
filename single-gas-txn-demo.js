require("log-timestamp");
const ethers = require("ethers");

const privateKey = ("c0c786b9473490432ebf87ead394472d89f55a958f1b36a92a34d17010833b2a").toString('hex');
const wallet = new ethers.Wallet(privateKey);
const polygon_rp_testnet = "https://matic-mumbai.chainstacklabs.com/";
const polygon_rp_mainnet = "https://polygon-rpc.com";
const address = "0xfE63903132e02768006B9f5434ecCbe2e68B3412";
console.log("Public Address:", address);


const httpsProvider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/7K346rg1key-16dbuyO7d5kLu3plVACq");
const init = async function () {
  

  let nonce = await httpsProvider.getTransactionCount(address);
  console.log("Nonce:", nonce);

  let feeData = await httpsProvider.getFeeData();
  console.log("Fee Data:", feeData);

  const tx = {
    type: 2,
    nonce: nonce,
    to: "0x4e84B154664C09E2efE5a8C0a9F686e068d09C46", // Address to send to
    maxPriorityFeePerGas: feeData["maxPriorityFeePerGas"], // Recommended maxPriorityFeePerGas
    maxFeePerGas: feeData["maxFeePerGas"], // Recommended maxFeePerGas
    value: ethers.utils.parseEther("0.01"), // .01 ETH
    gasLimit: "21000", // basic transaction costs exactly 21000
    chainId: 80001, // 
  };
  console.log("Transaction Data:", tx);

  const signedTx = await wallet.signTransaction(tx);
  console.log("Signed Transaction:", signedTx);

  const txHash = ethers.utils.keccak256(signedTx);
  console.log("Precomputed txHash:", txHash);
  console.log(txHash);

  httpsProvider.sendTransaction(signedTx).then(console.log);

};

init();