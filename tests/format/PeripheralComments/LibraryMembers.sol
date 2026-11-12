library A {/* first */ function a() internal {} function b() internal {} /* last */}

library B {
    // leading
    function a() internal {}
    function b() internal {}
    // trailing
}

library C {
    /**
     * @dev doc on first
     */
    function a() internal {}
    function b() internal {} // after last
}

library D {
    // only a comment
}
