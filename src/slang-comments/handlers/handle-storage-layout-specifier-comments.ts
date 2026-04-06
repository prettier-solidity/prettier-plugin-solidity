import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { util } from 'prettier';
import { createKindCheckFunction } from '../../slang-utils/create-kind-check-function.js';
import { TerminalNode } from '../../slang-nodes/TerminalNode.js';

import type { Expression } from '../../slang-nodes/Expression.js';
import type { PrintableNode } from '../../slang-nodes/types.d.ts';
import type { HandlerParams } from './types.d.ts';

const { addLeadingComment } = util;

const isExpression = createKindCheckFunction([
  NonterminalKind.AssignmentExpression,
  NonterminalKind.ConditionalExpression,
  NonterminalKind.OrExpression,
  NonterminalKind.AndExpression,
  NonterminalKind.EqualityExpression,
  NonterminalKind.InequalityExpression,
  NonterminalKind.BitwiseOrExpression,
  NonterminalKind.BitwiseXorExpression,
  NonterminalKind.BitwiseAndExpression,
  NonterminalKind.ShiftExpression,
  NonterminalKind.AdditiveExpression,
  NonterminalKind.MultiplicativeExpression,
  NonterminalKind.ExponentiationExpression,
  NonterminalKind.PostfixExpression,
  NonterminalKind.PrefixExpression,
  NonterminalKind.FunctionCallExpression,
  NonterminalKind.CallOptionsExpression,
  NonterminalKind.MemberAccessExpression,
  NonterminalKind.IndexAccessExpression,
  NonterminalKind.NewExpression,
  NonterminalKind.TupleExpression,
  NonterminalKind.TypeExpression,
  NonterminalKind.ArrayExpression,
  NonterminalKind.HexNumberExpression,
  NonterminalKind.DecimalNumberExpression,
  NonterminalKind.StringLiteral,
  NonterminalKind.StringLiterals,
  NonterminalKind.HexStringLiteral,
  NonterminalKind.HexStringLiterals,
  NonterminalKind.UnicodeStringLiterals,
  NonterminalKind.AddressType
]) as (node: PrintableNode) => node is Expression['variant'];

export default function handleStorageLayoutSpecifierComments({
  enclosingNode,
  followingNode,
  comment
}: HandlerParams): boolean {
  if (enclosingNode?.kind !== NonterminalKind.StorageLayoutSpecifier) {
    return false;
  }

  if (
    followingNode &&
    (isExpression(followingNode) || followingNode instanceof TerminalNode)
  ) {
    addLeadingComment(followingNode, comment);
    return true;
  }

  return false;
}
