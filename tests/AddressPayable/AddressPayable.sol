pragma solidity ^0.5.2;

contract AddressPayable {
  function sendSomeEth(address payable to) public payable {
    address payable target = to;
    target.transfer(msg.value);
  }
}
