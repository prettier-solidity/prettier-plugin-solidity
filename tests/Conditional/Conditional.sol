pragma solidity ^0.4.24;


contract Conditional {
    function foo() {
        address contextAddress = longAddress_ == address(0) ? msg.sender : currentContextAddress_;
    }

    // TODO: work with a break in the condition level.
    // function foo() {
    //     address contextAddress = veryVeryVeryVeryVeryVeryVeryVeryVeryLongAddress_ == address(0) ? msg.sender : currentContextAddress_;
    // }

    function bar() {
        uint a = true ? 0 : 1;
    }
}
