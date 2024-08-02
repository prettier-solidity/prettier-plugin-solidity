import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { createKindCheckFunction } from './create-kind-check-function.js';

import type { AstNode, BinaryOperation } from '../types';

export const isBinaryOperation = createKindCheckFunction([
  NonterminalKind.AdditiveExpression,
  NonterminalKind.MultiplicativeExpression,
  NonterminalKind.ExponentiationExpression,
  NonterminalKind.AssignmentExpression,
  NonterminalKind.BitwiseAndExpression,
  NonterminalKind.BitwiseOrExpression,
  NonterminalKind.BitwiseXorExpression,
  NonterminalKind.ComparisonExpression,
  NonterminalKind.EqualityExpression,
  NonterminalKind.AndExpression,
  NonterminalKind.OrExpression,
  NonterminalKind.ShiftExpression
]) as (node: AstNode | Comment | Node) => node is BinaryOperation;
