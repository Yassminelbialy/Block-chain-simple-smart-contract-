pragma solidity 0.5.0;

contract Lottery {
    address public manager;
    address payable[] public players;
    constructor() public {
        manager = msg.sender;    
    }
    
    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }
    
    function random() private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.difficulty, now, players)));
    }
    
    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);
        players = new address payable[](0);
    }
    
    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }
           function all() public view returns (uint256 ) {
        return uint256(players.length);
    } 
    function allbalance () public view returns (uint) {
        return address(this).balance;
    } 
    
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}