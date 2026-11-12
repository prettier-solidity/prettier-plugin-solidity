function a(uint x) pure returns (uint) { return x; }
function b(uint x) pure returns (uint) { return x; }

using {/* first */ a, b /* last */} for uint;
using {
    // leading
    a,
    b
    // trailing
} for uint;
using {
    a, // after first
    b // after last
} for uint;
