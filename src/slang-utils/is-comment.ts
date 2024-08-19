import { TerminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { createKindCheckFunction } from './create-kind-check-function.js';

import type { Node } from '@nomicfoundation/slang/cst';
import type {
  AstNode,
  BlockComment,
  Comment,
  LineComment
} from '../slang-nodes';

export const isBlockComment = createKindCheckFunction([
  TerminalKind.MultiLineComment,
  TerminalKind.MultiLineNatSpecComment
]) as (node: AstNode) => node is BlockComment;

export const isLineComment = createKindCheckFunction([
  TerminalKind.SingleLineComment,
  TerminalKind.SingleLineNatSpecComment
]) as (node: AstNode) => node is LineComment;

export const isComment = createKindCheckFunction([
  TerminalKind.MultiLineComment,
  TerminalKind.MultiLineNatSpecComment,
  TerminalKind.SingleLineComment,
  TerminalKind.SingleLineNatSpecComment
]) as (node: AstNode | Node) => node is Comment;
