import { TerminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';
import { MultiLineComment } from '../slang-nodes/MultiLineComment.js';
import { MultiLineNatSpecComment } from '../slang-nodes/MultiLineNatSpecComment.js';
import { SingleLineComment } from '../slang-nodes/SingleLineComment.js';
import { SingleLineNatSpecComment } from '../slang-nodes/SingleLineNatSpecComment.js';

import type { Edge } from '@nomicfoundation/slang/cst';
import type { Comment, StrictAstNode } from '../slang-nodes/types.d.ts';
import type { AstLocation, SlangAstNode } from '../types.d.ts';

const isCommentOrWhiteSpace = createKindCheckFunction([
  TerminalKind.MultiLineComment,
  TerminalKind.MultiLineNatSpecComment,
  TerminalKind.SingleLineComment,
  TerminalKind.SingleLineNatSpecComment,
  TerminalKind.EndOfLine,
  TerminalKind.Whitespace
]);

const offsets = new Map<number, number>();
export function clearOffsets(): void {
  offsets.clear();
}

function getLeadingOffset(children: Edge[]): number {
  let offset = 0;
  for (const { node } of children) {
    if (node.isNonterminalNode() || !isCommentOrWhiteSpace(node)) {
      // The node's content starts when we find the first non-terminal token,
      // or if we find a non-comment, non-whitespace token.
      return offset;
    }
    offset += node.textLength.utf16;
  }
  return offset;
}

function collectComments(
  comments: Comment[],
  node: StrictAstNode | StrictAstNode[] | undefined
): Comment[] {
  if (node) {
    if (Array.isArray(node)) {
      return node.reduce(collectComments, comments);
    }
    if (node.comments.length > 0) {
      comments.push(...node.comments.splice(0));
    }
  }
  return comments;
}

export class SlangNode {
  comments: Comment[] = [];

  loc: AstLocation;

  constructor(
    ast: SlangAstNode | TerminalNode,
    enclosePeripheralComments = false
  ) {
    if (ast instanceof TerminalNode) {
      const offset = offsets.get(ast.id) || 0;
      this.loc = {
        start: offset,
        end: offset + ast.textLength.utf16,
        leadingOffset: 0,
        trailingOffset: 0
      };
      return;
    }
    const parent = ast.cst;
    const children = parent.children();

    const initialOffset = offsets.get(parent.id) || 0;
    let offset = initialOffset;

    for (const { node } of children) {
      const { id, kind, textLength } = node;
      if (node.isNonterminalNode()) {
        offsets.set(id, offset);
      } else {
        switch (kind) {
          // Since the fetching the comments and calculating offsets are both done
          // as we iterate over the children and the comment also depends on the
          // offset, it's hard to separate these responsibilities into different
          // functions without doing the iteration twice.
          case TerminalKind.MultiLineComment:
            this.comments.push(new MultiLineComment(node, offset));
            break;
          case TerminalKind.MultiLineNatSpecComment:
            this.comments.push(new MultiLineNatSpecComment(node, offset));
            break;
          case TerminalKind.SingleLineComment:
            this.comments.push(new SingleLineComment(node, offset));
            break;
          case TerminalKind.SingleLineNatSpecComment:
            this.comments.push(new SingleLineNatSpecComment(node, offset));
            break;
          case TerminalKind.Identifier:
          case TerminalKind.YulIdentifier:
            // Identifiers usually are user provided names for variables,
            // functions, etc...
            // Since a user can add comments to this section of the code as well,
            // we need to track the offsets.
            offsets.set(id, offset);
            break;
        }
      }

      offset += textLength.utf16;
    }

    const [leadingOffset, trailingOffset] = enclosePeripheralComments
      ? [0, 0]
      : [getLeadingOffset(children), getLeadingOffset(children.reverse())];

    this.loc = {
      start: initialOffset + leadingOffset,
      end: offset - trailingOffset,
      leadingOffset,
      trailingOffset
    };
  }

  updateMetadata(
    ...childNodes: (StrictAstNode | StrictAstNode[] | undefined)[]
  ): void {
    const { comments, loc } = this;
    // Collect comments
    this.comments = childNodes.reduce(collectComments, comments);

    // calculate correct loc object
    if (loc.leadingOffset === 0) {
      for (const childNode of childNodes) {
        if (typeof childNode === 'undefined' || Array.isArray(childNode))
          continue;
        const { leadingOffset, start } = childNode.loc;

        if (start - leadingOffset === loc.start) {
          loc.leadingOffset = leadingOffset;
          loc.start += leadingOffset;
          break;
        }
      }
    }

    if (loc.trailingOffset === 0) {
      for (const childNode of childNodes.reverse()) {
        if (typeof childNode === 'undefined' || Array.isArray(childNode))
          continue;
        const { trailingOffset, end } = childNode.loc;

        if (end + trailingOffset === loc.end) {
          loc.trailingOffset = trailingOffset;
          loc.end -= trailingOffset;
          break;
        }
      }
    }
    this.loc = loc;
  }
}
