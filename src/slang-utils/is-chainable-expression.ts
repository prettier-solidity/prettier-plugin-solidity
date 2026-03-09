import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createKindCheckFunction } from './create-kind-check-function.js';

import type {
  ChainableExpression,
  StrictAstNode
} from '../slang-nodes/types.d.ts';

export const isChainableExpression = createKindCheckFunction([
  NonterminalKind.FunctionCallExpression,
  NonterminalKind.IndexAccessExpression,
  NonterminalKind.MemberAccessExpression
]) as (node: StrictAstNode) => node is ChainableExpression;
