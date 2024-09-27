pragma solidity ^0.4.26;

contract Constructors is Ownable, Changeable {
  function Constructors(variable1) public Changeable(variable1) Ownable() onlyOwner {
  }
}
