contract C {
    function f() public pure {
        assembly {
            let a := add(/* first */ 1, 2 /* last */)
            let b := add(
                // leading
                1,
                2
                // trailing
            )
            let c := add(
                1, // after first
                2 // after last
            )
        }
    }
}
