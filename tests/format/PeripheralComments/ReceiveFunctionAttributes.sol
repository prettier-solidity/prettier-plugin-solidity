contract A {
    receive() /* first */ external payable /* last */ {}
}

contract B {
    receive()
        // leading
        external
        payable
    // trailing
    {}
}

contract C {
    receive() external // after first
    payable // after last
    {}
}
