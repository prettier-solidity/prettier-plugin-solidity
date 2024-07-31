import { TerminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { createKindCheckFunction } from './create-kind-check-function.js';

import type { Node } from '@nomicfoundation/slang/cst';
import type { AstNode, BlockComment, Comment, LineComment } from '../types.js';

export const isBlockComment = createKindCheckFunction([
  TerminalKind.MultiLineComment,
  TerminalKind.MultiLineNatSpecComment
]) as (node: AstNode | Comment | Node) => node is BlockComment;

export const isLineComment = createKindCheckFunction([
  TerminalKind.SingleLineComment,
  TerminalKind.SingleLineNatSpecComment
]) as (node: AstNode | Comment | Node) => node is LineComment;

export const isComment = createKindCheckFunction([
  TerminalKind.MultiLineComment,
  TerminalKind.MultiLineNatSpecComment,
  TerminalKind.SingleLineComment,
  TerminalKind.SingleLineNatSpecComment
]) as (node: AstNode | Comment | Node) => node is Comment;
