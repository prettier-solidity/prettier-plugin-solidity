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

const isUnstable = (filepath, options) =>
  unstableTests.get(filepath)?.(options);

const isAstUnstable = (filepath, options) =>
  unstableAstTests.get(filepath)?.(options);

export { isAstUnstable, isUnstable };
