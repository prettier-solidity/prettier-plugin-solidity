contract C {
    uint /* first */ public constant /* last */ a = 1;
    uint
        // leading
        public
        constant
        // trailing
        b = 1;
    uint public // after first
        constant // after last
        c = 1;
}
