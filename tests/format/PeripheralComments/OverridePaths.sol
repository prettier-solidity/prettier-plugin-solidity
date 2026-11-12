interface A { function f() external; }
interface B { function f() external; }

contract C is A, B {
    function f() external override(/* first */ A, B /* last */) {}
}

contract D is A, B {
    function f()
        external
        override(
            // leading
            A,
            B
            // trailing
        )
    {}
}

contract E is A, B {
    function f()
        external
        override(
            A, // after first
            B // after last
        )
    {}
}
