// SPDK-Licence-identifier: SEE LICENCE IN LICENCE
pragma solidity ^0.8.27;

contract Message{
    address public owner;
    string public message;

    constructor() {
        owner = msg.sender;
    }

    event MessageSet(address setter, string message);
    event MessageGet(address setter, string message);
    event OwnershaipTransfered(address previousOwner, address newOwner);

    function setMessage(string memory _message) public {
        require(msg.sender != address(0), "You can't set your own message");
        require(msg.sender == owner, "you aren't the owner");
        message =_message;

        emit MessageSet(msg.sender, message);
    }

    function getMessage() public view returns (string memory){
        return message;
    } 

    function transferOwnership(address _newOwner) public{
        require(msg.sender == owner, "you are not the owner");
        require(_newOwner != address(0), "you can't transfer ownership to address zero");


        emit OwnershaipTransfered(owner, _newOwner);
        owner = _newOwner;


    }
}

