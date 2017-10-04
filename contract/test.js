const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//modify contractAddress and tokenContractAddress in the servers config
const config = require('../server/config');

//if this doesnt exist, do truffle compile
const contractJson = require('./build/contracts/AeternityWall.json');
const contractAddress = config.contractAddress;
const wallContract = new web3.eth.Contract(contractJson.abi, contractAddress);

//copy the token contract json to this location (is in gitignore I guess)
const tokenContractJson = require('./build/contracts/AEToken.json');
const tokenContractAddress = config.tokenContractAddress;
const tokenContract = new web3.eth.Contract(tokenContractJson.abi, tokenContractAddress);

//hardcode you addresses here
let maxAddress = "0x197ad4c0dc0155b9d6e80a059120473873a21133"; // testrpc1
let toAddress = "0x1be4d9268944897475152ce7c564dfc359c9b355"; // testrpc2


async function main() {
	approveAndCall();
	// getAllowance(maxAddress, contractAddress);
	// getBalance(maxAddress);
	// getBalance(toAddress);
	// transferFrom(contractAddress, maxAddress, toAddress, 2);

	// approve(maxAddress, toAddress, 3);
	// getAllowance(maxAddress, toAddress);
	// transferFrom(toAddress, maxAddress, toAddress, 2);
}

async function approveAndCall() {
	let spender = contractAddress;
	let value = 2;
	// let extraData = "0x42";
	// let extraData = web3.utils.asciiToHex("Hallo Welt");
	let extraData = toAddress;
	let from = maxAddress;
	let method = tokenContract.methods.approveAndCall(spender, value, extraData);
	let estimate = await getEstimate(from, method);
	console.log('estimate', estimate);
	let result = await method.send({
		from: from,
		gas: estimate
	});
	console.log('result', result);
	return result;
}

async function getEstimate(from, method) {
	return await method.estimateGas({
		from: from
	});
}

async function getAllowance(owner, spender) {
	let allowance = await tokenContract.methods.allowance(owner, spender).call();
	console.log('getAllowance', owner, spender, allowance);
	return allowance;
}

async function getBalance(address) {
	let balance = await tokenContract.methods.balanceOf(address).call();
	console.log('getBalance', address, balance);
	return balance;
}

async function transferFrom(from, sender, receiver, value) {
	let method = tokenContract.methods.transferFrom(sender, receiver, value);
	let estimate = await getEstimate(from, method);
	console.log('estimate', estimate);
	let result = await method.send({
		from: from,
		gas: estimate
	});
	console.log('result', result);
	return result;
}

async function approve(from, receiver, value) {
	let method = tokenContract.methods.approve(receiver, value);
	let estimate = await getEstimate(from, method);
	console.log('estimate', estimate);
	let result = await method.send({
		from: from,
		gas: estimate
	});
	console.log('result', result);
	return result;
}

main();
