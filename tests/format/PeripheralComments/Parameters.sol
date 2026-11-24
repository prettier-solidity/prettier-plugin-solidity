contract C {
    function a(/* first */ uint x, uint y /* last */) public {}

    function b(
        // leading
        uint x,
        uint y
        // trailing
    ) public {}

    function c(
        uint x, // after first
        uint y // after last
    ) public {}

    function d(/* only a comment */) public {}
}
