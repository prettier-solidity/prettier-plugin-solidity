contract C {
    function a() /* first */ public pure /* last */ {}

    function b()
        // leading
        public
        pure
    // trailing
    {}

    function c() public // after first
    pure // after last
    {}
}
