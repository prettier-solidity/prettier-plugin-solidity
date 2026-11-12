contract A {
    fallback() /* first */ external payable /* last */ {}
}

contract B {
    fallback()
        // leading
        external
        payable
    // trailing
    {}
}

contract C {
    fallback() external // after first
    payable // after last
    {}
}
