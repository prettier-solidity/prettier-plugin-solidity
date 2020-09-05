contract FunctionTypes {
    struct Something {
        function (address) external view   returns (uint256) getSomething;
    }

function reduce(
        uint256[] memory self, 
        function  (uint256, uint256) pure   returns (uint256) f
    ) internal pure returns (uint256 r) {
        r = self[0];
        for (uint256 i = 1; i < self.length; i++) {
            r = f(r, self[i]);
        }
    }
}
