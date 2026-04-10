import path from "node:path";
import createEsmUtils from "esm-utils";
import compileContract from "./utils/compile-contract.js";

async function testBytecodeCompare(testCase) {
  const { filepath, formatOptions } = testCase;
  const formatResult = await testCase.runFormat();

  if (shouldCompareBytecode(filepath, formatOptions)) {
    const output = compileContract(filepath, formatResult.output);
    const expected = compileContract(filepath, formatResult.input);
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

const shouldCompareBytecode = (filepath, options) => {
  const testFunction = testsWithAstChanges.get(filepath);

  if (!testFunction) {
    return false;
  }

  return testFunction(options);
};

export { testBytecodeCompare as run };
