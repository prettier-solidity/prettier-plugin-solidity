import { TerminalKind } from '@nomicfoundation/slang/cst';
import { createKindCheckFunction } from './create-kind-check-function.js';

import type { Node } from '@nomicfoundation/slang/cst';
import type {
  BlockComment,
  Comment,
  PrintableNode
} from '../slang-nodes/types.d.ts';

export const isBlockComment = createKindCheckFunction([
  TerminalKind.MultiLineComment,
  TerminalKind.MultiLineNatSpecComment
]) as (node: PrintableNode | Comment | Node) => node is BlockComment;

export const isComment = createKindCheckFunction([
  TerminalKind.MultiLineComment,
  TerminalKind.MultiLineNatSpecComment,
  TerminalKind.SingleLineComment,
  TerminalKind.SingleLineNatSpecComment
]) as (node: PrintableNode | Comment | Node) => node is Comment;
