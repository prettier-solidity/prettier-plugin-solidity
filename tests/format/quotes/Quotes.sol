import 'someContract.sol';
import "someOtherContract.sol";

contract Foo {
  string foo1 = 'foo';
  string foo2 = "foo";
  string spaces1 = 'the quick brown fox';
  string spaces2 = "the quick brown fox";
  string singleQuote = "don't do that";
  string escapedSingleQuote = 'don\'t do that';
  string doubleQuote = 'Use " for quoting';
  string escapedDoubleQuote = "Use \" for quoting";
  string singleQuotes = "don't do that, don't";
  string escapedSingleQuotes = 'don\'t do that, don\'t';
  string doubleQuotes = 'The "quick" brown fox';
  string escapeDoubleQuotes = "The \"quick\" brown fox";
  bytes8 hex1 = hex'DeadBeef';
  bytes8 hex2 = hex"DeadBeef";
  string withUnicode1 = unicode'hello 🦄 world';
  string withUnicode2 = unicode"hello 🦄 world";
  string multiPartAndUnicode = unicode'hello 🦄' unicode' world 🦄';
}
