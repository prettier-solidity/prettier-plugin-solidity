contract A {}
contract B {}

contract C is /* first */ A, B /* last */ {}

contract D is
    // leading
    A,
    B
// trailing
{}

contract E is
    A, // after first
    B // after last
{}
