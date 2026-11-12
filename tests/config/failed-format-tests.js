import path from "node:path";
import { FORMAT_TEST_DIRECTORY } from "./constants.js";

// Here we add files that will not be the same when formatting a second time.
const unstableTests = new Map(
  [
    // TODO A comment at the edge of these collections moves when formatting a
    // second time.
    "PeripheralComments/ContractSpecifiers.sol",
    "PeripheralComments/EnumMembers.sol",
    "PeripheralComments/ImportDeconstructionSymbols.sol",
    "PeripheralComments/OverridePaths.sol",
    "PeripheralComments/StateVariableAttributes.sol",
  ].map((fixture) => {
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
    "IfStatements/ElseBranchComments.sol",
    "IndexOf/IndexOf.sol",
    // ANTLR prints two spaces before a trailing comment after `let` without
    // a value.
    "Assembly/YulListsAtTheEdge.sol",
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
    // ANTLR has parses a state variable declaration with with a name `x` and a
    // function type as a unnamed function with an `x` modifier.
    "StateVariableDeclarations/FunctionTypeVisibility.sol",
    // ANTLR doesn't print comments inside an empty struct.
    "Comments/DanglingComments.sol",
    // Antlr has the previous tuple formatting.
    "Tuples/TupleDeconstructionComments.sol",
    "Tuples/TupleDeconstructionEmptyLastSlot.sol",
    // ANTLR misplaces, or fails to print, the comments at the edges of a
    // collection.
    "PeripheralComments/ArrayValues.sol",
    "PeripheralComments/AssemblyFlags.sol",
    "PeripheralComments/CallOptions.sol",
    "PeripheralComments/ConstructorAttributes.sol",
    "PeripheralComments/ContractSpecifiers.sol",
    "PeripheralComments/EnumMembers.sol",
    "PeripheralComments/ErrorParameters.sol",
    "PeripheralComments/EventParameters.sol",
    "PeripheralComments/FallbackFunctionAttributes.sol",
    "PeripheralComments/FunctionAttributes.sol",
    "PeripheralComments/FunctionTypeAttributes.sol",
    "PeripheralComments/ImportDeconstructionSymbols.sol",
    "PeripheralComments/InheritanceTypes.sol",
    "PeripheralComments/ModifierAttributes.sol",
    "PeripheralComments/NamedArguments.sol",
    "PeripheralComments/OverridePaths.sol",
    "PeripheralComments/Parameters.sol",
    "PeripheralComments/PositionalArguments.sol",
    "PeripheralComments/ReceiveFunctionAttributes.sol",
    "PeripheralComments/SimpleVersionLiteral.sol",
    "PeripheralComments/StateVariableAttributes.sol",
    "PeripheralComments/StructMembers.sol",
    "PeripheralComments/TupleDeconstructionElements.sol",
    "PeripheralComments/TupleValues.sol",
    "PeripheralComments/UnnamedFunctionAttributes.sol",
    "PeripheralComments/UsingDeconstructionSymbols.sol",
    "PeripheralComments/VersionExpressionSet.sol",
    "PeripheralComments/VersionExpressionSets.sol",
    "PeripheralComments/YulArguments.sol",
    "PeripheralComments/YulParameters.sol",
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
