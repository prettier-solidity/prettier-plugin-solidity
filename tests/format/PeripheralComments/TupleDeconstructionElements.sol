contract C {
    function f() public pure returns (uint, uint) { return (1, 2); }

    function g() public pure {
        (/* first */ uint a, uint b /* last */) = f();
        (
            // leading
            uint c,
            uint d
            // trailing
        ) = f();
        (
            uint e, // after first
            uint g // after last
        ) = f();
    }
}
