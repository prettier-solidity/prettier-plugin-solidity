contract A {
    constructor() /* first */ payable /* last */ {}
}

contract B {
    constructor()
        // leading
        payable
    // trailing
    {}
}

contract C {
    constructor() payable // after last
    {}
}
