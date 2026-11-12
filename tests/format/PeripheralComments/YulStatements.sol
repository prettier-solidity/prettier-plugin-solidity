contract C {
    function f() public pure {
        assembly {/* first */ let a := 1 let b := 2 /* last */}
        assembly {
            // leading
            let a := 1
            let b := 2
            // trailing
        }
        assembly {
            let a := 1 // after first
            let b := 2 // after last
        }
        assembly {
            // only a comment
        }
    }
}
