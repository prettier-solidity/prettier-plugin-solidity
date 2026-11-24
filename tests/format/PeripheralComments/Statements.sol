contract C {
    function a() public {/* first */ uint x; uint y; /* last */}

    function b() public {
        // leading
        uint x;
        uint y;
        // trailing
    }

    function c() public {
        uint x; // after first
        uint y; // after last
    }

    function d() public {
        // only a comment
    }
}
