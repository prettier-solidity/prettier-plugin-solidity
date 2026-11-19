interface A {/* first */ function a() external; function b() external; /* last */}

interface B {
    // leading
    function a() external;
    function b() external;
    // trailing
}

interface C {
    /**
     * @dev doc on first
     */
    function a() external;
    function b() external; // after last
}

interface D {
    // only a comment
}
