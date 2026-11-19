contract C {
    function f() public pure {
        assembly (/* first */ "memory-safe" /* last */) {}
        assembly (
            // leading
            "memory-safe"
            // trailing
        ) {}
        assembly ("memory-safe" // after last
        ) {}
    }
}
