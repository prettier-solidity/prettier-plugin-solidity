contract C {
    function f() public pure {
        uint a;
        uint b;
        (a, b) = (/* first */ 1, 2 /* last */);
        (a, b) = (
            // leading
            1,
            2
            // trailing
        );
        (a, b) = (
            1, // after first
            2 // after last
        );
    }
}
