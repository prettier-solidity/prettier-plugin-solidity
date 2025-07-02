import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createKindCheckFunction } from './create-kind-check-function.js';

import type { BinaryOperation, StrictAstNode } from '../slang-nodes/types.d.ts';
import type { UnionToArray } from './types.js';

type BinaryOperationKinds = UnionToArray<BinaryOperation['kind']>;

const binaryOperationKinds: BinaryOperationKinds = [
  NonterminalKind.AdditiveExpression,
  NonterminalKind.AndExpression,
  NonterminalKind.AssignmentExpression,
  NonterminalKind.BitwiseAndExpression,
  NonterminalKind.BitwiseOrExpression,
  NonterminalKind.BitwiseXorExpression,
  NonterminalKind.EqualityExpression,
  NonterminalKind.ExponentiationExpression,
  NonterminalKind.InequalityExpression,
  NonterminalKind.MultiplicativeExpression,
  NonterminalKind.OrExpression,
  NonterminalKind.ShiftExpression
];

export const isBinaryOperation = createKindCheckFunction(
  binaryOperationKinds
) as (node: StrictAstNode) => node is BinaryOperation;
