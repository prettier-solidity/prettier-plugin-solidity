pragma solidity >=0.4.0 <0.6.0;


contract WhitespaceInExpressions {
    function () {
        spam( ham[ 1 ], Coin( { name: "ham" } ) );
        x             = 1;
        y             = 2;
        long_variable = 3;
    }

    function spam(uint i , Coin coin) public ;
}
