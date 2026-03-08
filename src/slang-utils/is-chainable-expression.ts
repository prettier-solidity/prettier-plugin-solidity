import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createKindCheckFunction } from './create-kind-check-function.js';

import type { ChainableExpression } from '../slang-nodes/types.js';
import type { Expression } from '../slang-nodes/Expression.js';

export const isChainableExpression = createKindCheckFunction([
  NonterminalKind.FunctionCallExpression,
  NonterminalKind.IndexAccessExpression,
  NonterminalKind.MemberAccessExpression
]) as (node: Expression['variant']) => node is ChainableExpression;
