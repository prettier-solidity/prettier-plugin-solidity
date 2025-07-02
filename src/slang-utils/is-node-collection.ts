import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createKindCheckFunction } from './create-kind-check-function.js';

import type { Node } from '@nomicfoundation/slang/cst';
import type { StrictAstNode, NodeCollection } from '../slang-nodes/types.d.ts';

// TODO: write a test to make sure every collection node is included in this
// list. Investigate https://github.com/samchon/typia to check for types on
// runtime.
export const isNodeCollection = createKindCheckFunction([
  NonterminalKind.ArrayValues,
  NonterminalKind.AssemblyFlags,
  NonterminalKind.CallOptions,
  NonterminalKind.CatchClause,
  NonterminalKind.ConstructorAttributes,
  NonterminalKind.ContractMembers,
  NonterminalKind.ContractSpecifiers,
  NonterminalKind.EnumMembers,
  NonterminalKind.ErrorParameters,
  NonterminalKind.EventParameters,
  NonterminalKind.FallbackFunctionAttributes,
  NonterminalKind.FunctionAttributes,
  NonterminalKind.FunctionTypeAttributes,
  NonterminalKind.HexStringLiterals,
  NonterminalKind.IdentifierPath,
  NonterminalKind.ImportDeconstructionSymbols,
  NonterminalKind.InheritanceTypes,
  NonterminalKind.InterfaceMembers,
  NonterminalKind.LibraryMembers,
  NonterminalKind.ModifierAttributes,
  NonterminalKind.NamedArguments,
  NonterminalKind.OverridePaths,
  NonterminalKind.Parameters,
  NonterminalKind.PositionalArguments,
  NonterminalKind.ReceiveFunctionAttributes,
  NonterminalKind.SourceUnitMembers,
  NonterminalKind.Statements,
  NonterminalKind.StateVariableAttributes,
  NonterminalKind.StringLiterals,
  NonterminalKind.StructMembers,
  NonterminalKind.TupleDeconstructionElements,
  NonterminalKind.TupleValues,
  NonterminalKind.UnicodeStringLiterals,
  NonterminalKind.UnnamedFunctionAttributes,
  NonterminalKind.UsingDeconstructionSymbols,
  NonterminalKind.VersionExpressionSet,
  NonterminalKind.VersionExpressionSets,
  NonterminalKind.YulArguments,
  NonterminalKind.YulParameters,
  NonterminalKind.YulPath,
  NonterminalKind.YulPaths,
  NonterminalKind.YulStatements,
  NonterminalKind.YulSwitchCases,
  NonterminalKind.YulVariableNames
]) as (node: StrictAstNode | Node) => node is NodeCollection;
