pragma solidity 0.5.8;


contract VariableTypesMixed {
    uint256 public a;
    int256 public b;
    bytes1 public c;
    uint public e;
    int public f;
    byte public g;

    struct S {
        uint a;
        int b;
        byte c;
        uint256 e;
        int256 f;
        bytes1 g;
    }

    event Event(uint _a, int256 _b, bytes1 _c, uint256 _e, int _f, byte _g);

    function func(uint256 _a, int256 _b, byte _c, uint _e, int _f, bytes1 _g)
        public
        returns (uint, int256, byte, uint256, int, bytes1)
    {
        emit Event(_a, _b, _c, _e, _f, _g);
        return (_a, _b, _c, _e, _f, _g);
    }
}
