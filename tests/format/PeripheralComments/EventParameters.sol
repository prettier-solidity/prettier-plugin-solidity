contract C {
    event A(/* first */ uint a, uint b /* last */);

    event B(
        // leading
        uint a,
        uint b
        // trailing
    );

    event D(
        uint a, // after first
        uint b // after last
    );
}
