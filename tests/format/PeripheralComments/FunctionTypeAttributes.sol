contract C {
    function(uint) /* first */ external pure /* last */ returns (uint) a;

    function(uint)
        // leading
        external
        pure
        // trailing
        returns (uint) b;

    function(uint) external // after first
    pure // after last
    returns (uint) c;
}
