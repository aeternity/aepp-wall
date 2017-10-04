pragma solidity ^0.4.4;

contract AeToken {
	function transferFrom(address _from, address _to, uint256 _value) returns (bool success);
	function transfer(address _to, uint256 _value) returns (bool success);
}

contract AeternityWall {
	event Stored();
	event Like(address _from, uint256 _value, address _tokenContract, bytes _extraData);

	function store(string key, string value) {
		Stored();
	}

	function receiveApproval(address _from, uint256 _value, address _tokenContract, bytes _extraData) public {
		//contract is allowed to get _value tokens of _from
		// this contract receiven an approval, just forward it to the final receiver
		AeToken aeToken = AeToken(_tokenContract);
		/*address to = 0x1be4d9268944897475152ce7c564dfc359c9b355;*/
		/*require(aeToken.transferFrom(_from, address(0x1be4d9268944897475152ce7c564dfc359c9b355), 2));*/
		/*require(aeToken.transferFrom(_from, this, _value));*/
		aeToken.transferFrom(_from, address(0x1be4d9268944897475152ce7c564dfc359c9b355), _value);


		/*require(_tokenContract.call(
			bytes4(
				bytes32(
					sha3("transferFrom(address,address,uint256)")
				)
			),
			_from,
			address(0x1be4d9268944897475152ce7c564dfc359c9b355),
			2
		));*/

		Like(_from, _value, _tokenContract, _extraData);
	}
}
