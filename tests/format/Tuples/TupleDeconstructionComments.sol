pragma solidity ^0.8.0;

contract TupleDeconstructionComments {
    // https://docs.chain.link/data-feeds/getting-started
    function getChainlinkDataFeedLatestAnswer() public view returns (int) {
        (
            /* uint80 roundID */,
            int answer,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = dataFeed.latestRoundData();
        return answer;
    }

    function singleLine() public view returns (uint) {
        (/* first */, uint second, /* third */) = values();
        return second;
    }

    function trailing() public view returns (uint) {
        (uint first, /* second */) = pair();
        return first;
    }

    function filledSlots() public view returns (uint) {
        (, /* leads second */ uint second, uint third /* trails third */) = values();
        return second + third;
    }

    function commentAfterAssignment() public view returns (uint) {
        (uint first, uint second) = /* not part of the tuple */ pair();
        return first + second;
    }

    function lineComments() public view returns (int) {
        (
            // uint80 roundID
            ,
            int answer,
            // uint startedAt
            ,
            // uint timeStamp
        ) = dataFeed.latestRoundData();
        return answer;
    }
}
