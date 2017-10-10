pragma solidity ^0.4.15;

// Fallback ERC20 token definition.
contract tokenFallback {
    uint256 public totalSupply;

    /// @param _owner The address from which the balance will be retrieved
    /// @return The balance
    function balanceOf(address _owner) constant returns (uint256 balance);

    /// @notice send `_value` token to `_to` from `msg.sender`
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transfer(address _to, uint256 _value) returns (bool success);

    /// @notice send `_value` token to `_to` from `_from` on the condition it is approved by `_from`
    /// @param _from The address of the sender
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transferFrom(address _from, address _to, uint256 _value) returns (bool success);

    /// @notice `msg.sender` approves `_addr` to spend `_value` tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @param _value The amount of wei to be approved for transfer
    /// @return Whether the approval was successful or not
    function approve(address _spender, uint256 _value) returns (bool success);

    /// @param _owner The address of the account owning tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @return Amount of remaining tokens allowed to spent
    function allowance(address _owner, address _spender) constant returns (uint256 remaining);

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}

contract AEWall {
	struct Graffiti {
		string message;
		address artist;
	}

	uint numGraffities;
	mapping(uint256 => Graffiti) graffities;

	event Like(address _from, uint256 _amount, address _artist);
	event Create(address _artist, string message, uint _id);

	function paint(string art) public returns (bool) {
		require(bytes(art).length > 0);
		// Guard against wrap around, just in case.
		require(numGraffities + 1 > numGraffities);
		graffities[numGraffities++] = Graffiti({message: art, artist: msg.sender});
		Create(msg.sender, art, numGraffities);
		return true;
	}

	function receiveApproval(
			address _from,
			uint256 _amount,
			address _token,
			bytes _extraData
			) public returns (bool) {
		require(msg.sender == _token);
	  // We only care about the first 20 bytes, which should hold our address.
		require(_extraData.length >= 20);
		address _artist = 0x0;
		assembly {
			_artist := mload(add(_extraData, 0x14))
		}
		require(tokenFallback(_token).transferFrom(_from, _artist, _amount));
		Like(_from, _amount, _artist);
		return true;
	}
}
