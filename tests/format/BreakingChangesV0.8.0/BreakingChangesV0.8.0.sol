// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <=0.8.5;

contract VariableTypesMixed {
    bytes1 public c;
    byte public g;

    struct S {
        bytes1 c;
        byte g;
    }

    event Event(bytes1 _c, byte _g);

    function func(
        bytes1 _c,
        byte _g
    )
        public
        returns (
            bytes1,
            byte
        )
    {
        emit Event(_c, _g);
        return (_c, _g);
    }
}
