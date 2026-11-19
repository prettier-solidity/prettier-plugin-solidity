contract C {
    function f(uint a, uint b) public {}

    function g() public {
        f({/* first */ a: 1, b: 2 /* last */});
        f({
            // leading
            a: 1,
            b: 2
            // trailing
        });
        f({
            a: 1, // after first
            b: 2 // after last
        });
    }
}
