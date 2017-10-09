pragma solidity ^0.4.15;

// Simple test token that does not even properly implements ERC20 functionality.
contract TestToken {
	function transfer(address _to, uint256 _value) public returns (bool success) {
		balances[msg.sender] -= _value;
		balances[_to] += _value;
		return true;
	}

	function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
		require(allowed[_from][msg.sender] >= _value);
		balances[_to] += _value;
		allowed[_from][msg.sender] -= _value;
		return true;
	}

	function approve(address _spender, uint256 _value) public returns (bool success) {
		allowed[msg.sender][_spender] = _value;
		return true;
	}

	function allowance(address _owner, address _spender) public constant returns (uint256 remaining) {
		return allowed[_owner][_spender];
	}

	function balanceOf(address _owner) public constant returns (uint256 balance) {
		return balances[_owner];
	}

	function approveAndCall(address _spender, uint256 _value, bytes _extraData) public returns (bool success) {
		allowed[msg.sender][_spender] = _value;
		require(_spender.call(bytes4(bytes32(sha3("receiveApproval(address,uint256,address,bytes)"))), msg.sender, _value, this, _extraData));
		return true;
	}

	mapping (address => uint256) balances;
	mapping (address => mapping (address => uint256)) allowed;
}

