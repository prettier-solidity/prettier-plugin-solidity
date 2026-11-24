contract C {
    function f() public pure {
        uint8[2] memory a = [/* first */ 1, 2 /* last */];
        uint8[2] memory b = [
            // leading
            1,
            2
            // trailing
        ];
        uint8[2] memory c = [
            1, // after first
            2 // after last
        ];
    }
}
