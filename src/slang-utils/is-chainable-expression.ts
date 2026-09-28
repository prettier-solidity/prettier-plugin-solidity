import { NonterminalKind } from './slang.ts';
import { createKindCheckFunction } from './create-kind-check-function.ts';

import type {
  ChainableExpression,
  PrintableNode
} from '../slang-nodes/types.d.ts';

export const isChainableExpression = createKindCheckFunction(() => [
  NonterminalKind.FunctionCallExpression,
  NonterminalKind.IndexAccessExpression,
  NonterminalKind.MemberAccessExpression
]) as (node: PrintableNode) => node is ChainableExpression;
