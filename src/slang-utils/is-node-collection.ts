import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createKindCheckFunction } from './create-kind-check-function.js';

import type { Node } from '@nomicfoundation/slang/cst';
import type { StrictAstNode, NodeCollection } from '../slang-nodes/types.d.ts';
import type { UnionToArray } from './types.js';

type NodeCollectionKinds = UnionToArray<NodeCollection['kind']>;

const collectionKinds: NodeCollectionKinds = [
  NonterminalKind.ArrayValues,
  NonterminalKind.AssemblyFlags,
  NonterminalKind.CallOptions,
  NonterminalKind.CatchClauses,
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
  NonterminalKind.StateVariableAttributes,
  NonterminalKind.Statements,
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
];

export const isNodeCollection = createKindCheckFunction(collectionKinds) as (
  node: StrictAstNode | Node
) => node is NodeCollection;
