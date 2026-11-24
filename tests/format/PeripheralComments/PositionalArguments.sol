contract C {
    function f(uint a, uint b) public {}

    function g() public {
        f(/* first */ 1, 2 /* last */);
        f(
            // leading
            1,
            2
            // trailing
        );
        f(
            1, // after first
            2 // after last
        );
        f(/* only a comment */);
    }
}
