contract C {
    function f() public pure {
        assembly {
            function a(/* first */ x, y /* last */) -> z {}
            function b(
                // leading
                x,
                y
                // trailing
            ) -> z {}
            function c(
                x, // after first
                y // after last
            ) -> z {}
        }
    }
}
