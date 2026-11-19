contract C {
    modifier a() /* first */ virtual /* last */ { _; }

    modifier b()
        // leading
        virtual
    // trailing
    { _; }

    modifier c() virtual // after last
    { _; }
}
