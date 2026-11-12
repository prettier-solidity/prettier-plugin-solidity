pragma solidity 0.5.0;

contract A {
    function() /* first */ external payable /* last */ {}
}

contract B {
    function()
        // leading
        external
        payable
    // trailing
    {}
}

contract C {
    function() external // after first
    payable // after last
    {}
}
