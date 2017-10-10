const AEWall = artifacts.require("./AEWall.sol")
const TestToken = artifacts.require("./TestToken.sol")
const abi = require('ethereumjs-abi')
const web3 = require('web3')

contract('AEWall', function(accounts) {
	let token
	let wall

	const artist = accounts[0]
	const fan = accounts[1]

	beforeEach(async () => {
		token = await TestToken.deployed()
		wall = await AEWall.deployed()
	})

  it("it should transfer tokens from wall", async () => {
		const b = abi.rawEncode(['uint256'], [0x80]).toString('hex') + abi.rawEncode(['uint256'], [0x14]).toString('hex') + web3.utils.padRight(artist.slice(2), 64)
    await token.approveAndCall(wall.address, 100, '0x' + b, {from: fan})
		assert.equal((await token.balanceOf(artist)).toString(), '100', 'did not transfer 100 tokens from user via wall to artist')
  })
})
