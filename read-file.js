const fs = require('fs');

const fileName = process.argv[2];

// read JSON object from file
fs.readFile(fileName, 'utf-8', (err, data) => {
    if (err) {
        throw err;
    }

    // parse JSON object
    const cryptoWallets = JSON.parse(data);

    // print JSON object
    console.log(cryptoWallets);
});



