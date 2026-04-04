import path from "node:path";
import createEsmUtils from "esm-utils";
import compileContract from "./utils/compile-contract.js";

async function testBytecodeCompare(
  _source,
  formatResult,
  filename,
  formatOptions,
) {
  if (shouldCompareBytecode(filename, formatOptions)) {
    const output = compileContract(filename, formatResult.output);
    const expected = compileContract(filename, formatResult.input);
    expect(output).toEqual(expected);
  }
}

const { __dirname } = createEsmUtils(import.meta);

const testsWithAstChanges = new Map(
  [
    "Parentheses/AddNoParentheses.sol",
    "Parentheses/SubNoParentheses.sol",
    "Parentheses/MulNoParentheses.sol",
    "Parentheses/DivNoParentheses.sol",
    "Parentheses/ModNoParentheses.sol",
    "Parentheses/ExpNoParentheses.sol",
    "Parentheses/ShiftLNoParentheses.sol",
    "Parentheses/ShiftRNoParentheses.sol",
    "Parentheses/BitAndNoParentheses.sol",
    "Parentheses/BitOrNoParentheses.sol",
    "Parentheses/BitXorNoParentheses.sol",
    "Parentheses/LogicNoParentheses.sol",
    "HexLiteral/HexLiteral.sol",
    "ModifierInvocations/ModifierInvocations.sol",
  ].map((fixture) => {
    const [file, compareBytecode = () => true] = Array.isArray(fixture)
      ? fixture
      : [fixture];
    return [path.join(__dirname, "../format/", file), compareBytecode];
  }),
);

const shouldCompareBytecode = (filename, options) => {
  const testFunction = testsWithAstChanges.get(filename);

  if (!testFunction) {
    return false;
  }

  return testFunction(options);
};

export { testBytecodeCompare as run };
