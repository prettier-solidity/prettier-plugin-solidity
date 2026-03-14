import path from "node:path";
import { FORMAT_TEST_DIRECTORY } from "./constants.js";

// Here we add files that will not be the same when formatting a second time.
const unstableTests = new Map(
  [].map((fixture) => {
    const [file, isUnstable = () => true] = Array.isArray(fixture)
      ? fixture
      : [fixture];
    return [path.join(FORMAT_TEST_DIRECTORY, file), isUnstable];
  }),
);

// Here we add files that will not have the same AST after being formatted.
const unstableAstTests = new Map(
  [
    // `: =` and `= :` are syntactically the same as `:=` and `=:`, but the ast
    // changes from `YulColonAndEqual` and `YulEqualAndColon` to `ColonEqual`
    // and `EqualColon`, which is expected but the workaround to keep the test
    // stable is too much, so we just put it in this list.
    "AssemblyV0.4.26/Assembly.sol",
  ].map((fixture) => {
    const [file, isUnstable = () => true] = Array.isArray(fixture)
      ? fixture
      : [fixture];
    return [path.join(FORMAT_TEST_DIRECTORY, file), isUnstable];
  }),
);

const antlrMismatchTests = new Map(
  [
    // Better placement of comments in Slang.
    "BasicIterator/BasicIterator.sol",
    "Comments/Comments.sol",
    "IndexOf/IndexOf.sol",
    // Syntax for `pragma solidity 0.5.0 - 0.6.0;` not supported by ANTLR
    "Pragma/Pragma.sol",
    // ANTLR doesn't support assembly assignment operators separated by a space
    // like `: =` or `= :`
    "AssemblyV0.4.26/Assembly.sol",
    // ANTLR doesn't support UntypedTupleMember with a storage location, which
    // is valid Slang, but not in Solidity.
    "AllSolidityFeaturesV0.4.26/AllSolidityFeatures.sol",
    // TODO Review how ANTLR is formatting chained assignments
    "Assignments/Assignments.sol",
  ].map((fixture) => {
    const [file, isUnstable = () => true] = Array.isArray(fixture)
      ? fixture
      : [fixture];
    return [path.join(FORMAT_TEST_DIRECTORY, file), isUnstable];
  }),
);

const isUnstable = (filepath, options) =>
  unstableTests.get(filepath)?.(options);

const isAstUnstable = (filepath, options) =>
  unstableAstTests.get(filepath)?.(options);

const isAntlrMismatch = (filepath, options) =>
  antlrMismatchTests.get(filepath)?.(options);

export { isAstUnstable, isUnstable, isAntlrMismatch };
