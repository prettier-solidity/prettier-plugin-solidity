contract A {/* first */ uint a; uint b; /* last */}

contract B {
    // leading
    uint a;
    uint b;
    // trailing
}

contract C { /** doc on first */
    uint a;
    uint b; // after last
}

contract D {
    // only a comment
}
