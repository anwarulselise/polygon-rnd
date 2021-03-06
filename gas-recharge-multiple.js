require("log-timestamp");
const ethers = require("ethers");
const lib = require('./crypto-lib');

// async function sendGas(rpcUrl, chainId, filePath, privateKeyString, publicAddress, gasAmount) {
//     return new Promise((resolve, reject) => {
//         const cryptoWallets = await lib.readFile(filePath);
//         const privateKey = privateKeyString.toString('hex');
//         const wallet = new ethers.Wallet(privateKey);
//         console.log("Public Address:", publicAddress);
    
    
//         const httpsProvider = new ethers.providers.JsonRpcProvider(rpcUrl);
    
//         const init = async function () {
    
//             let nonce = await httpsProvider.getTransactionCount(publicAddress);
//             console.log("Nonce:", nonce);       
    
//             for (const walletDetails of cryptoWallets.AddressList) {
//                 let feeData = await httpsProvider.getFeeData();
//                 console.log("Initiating gas transaction for:", walletDetails.PublicAddress);
//                 const tx = {
//                     type: 2,
//                     nonce: nonce,
//                     to: walletDetails.PublicAddress, // Address to send to
//                     maxPriorityFeePerGas: feeData["maxPriorityFeePerGas"], // Recommended maxPriorityFeePerGas
//                     maxFeePerGas: feeData["maxFeePerGas"], // Recommended maxFeePerGas
//                     value: ethers.utils.parseEther(gasAmount.toString()), // 
//                     gasLimit: "21000", // basic transaction costs exactly 21000
//                     chainId: chainId, // 
//                 };
//                 console.log("Transaction Data:", tx);
    
//                 const signedTx = await wallet.signTransaction(tx);
    
//                 const txHash = ethers.utils.keccak256(signedTx);
//                 console.log("Precomputed txHash:", txHash);
    
//                 httpsProvider.sendTransaction(signedTx).then(console.log);
//             }
    
//         };

//         resolve(init(), setTimeout(resolve, 1000));
    
//       });
//     }
    



async function sendGas(rpcUrl, chainId, filePath, privateKeyString, publicAddress, gasAmount) {
    const cryptoWallets = await lib.readFile(filePath);
    const privateKey = privateKeyString.toString('hex');
    const wallet = new ethers.Wallet(privateKey);
    console.log("Public Address:", publicAddress);


    const httpsProvider = new ethers.providers.JsonRpcProvider(rpcUrl);

    const init = async function () {

        let nonce = await httpsProvider.getTransactionCount(publicAddress);
        console.log("Nonce:", nonce);       

        for (const walletDetails of cryptoWallets.AddressList) {
            let feeData = await httpsProvider.getFeeData();
            console.log("Initiating gas transaction for:", walletDetails.PublicAddress);
            const tx = {
                type: 2,
                nonce: nonce,
                to: walletDetails.PublicAddress, // Address to send to
                maxPriorityFeePerGas: feeData["maxPriorityFeePerGas"], // Recommended maxPriorityFeePerGas
                maxFeePerGas: feeData["maxFeePerGas"], // Recommended maxFeePerGas
                value: ethers.utils.parseEther(gasAmount.toString()), // 
                gasLimit: "21000", // basic transaction costs exactly 21000
                chainId: chainId, // 
            };
            console.log("Transaction Data:", tx);

            const signedTx = await wallet.signTransaction(tx);

            const txHash = ethers.utils.keccak256(signedTx);
            console.log("Precomputed txHash:", txHash);
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            httpsProvider.sendTransaction(signedTx).then(console.log);
            nonce++;
        }

    };
    init();
}

module.exports = { sendGas }



