const Web3 = require('web3');
const config = require('../config');
let web3 = new Web3(Web3.givenProvider || config.rpcUrl);

module.exports = web3;
