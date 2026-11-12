contract C {
    function f(address payable a) public {
        a.call{/* first */ value: 1, gas: 2 /* last */}("");
        a.call{
            // leading
            value: 1,
            gas: 2
            // trailing
        }("");
        a.call{
            value: 1, // after first
            gas: 2 // after last
        }("");
    }
}
