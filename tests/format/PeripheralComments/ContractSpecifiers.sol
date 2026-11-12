contract A {}

contract B /* first */ is A /* last */ {}

contract C
    // leading
    is A
// trailing
{}

contract D is A // after last
{}
