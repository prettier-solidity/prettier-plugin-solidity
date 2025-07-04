import {
  NonterminalKind,
  TerminalKind,
  TerminalKindExtensions,
  TerminalNode
} from '@nomicfoundation/slang/cst';
import { isNodeCollection } from '../slang-utils/is-node-collection.js';
import { MultiLineComment } from '../slang-nodes/MultiLineComment.js';
import { MultiLineNatSpecComment } from '../slang-nodes/MultiLineNatSpecComment.js';
import { SingleLineComment } from '../slang-nodes/SingleLineComment.js';
import { SingleLineNatSpecComment } from '../slang-nodes/SingleLineNatSpecComment.js';

import type { Edge, Node } from '@nomicfoundation/slang/cst';
import type { Comment, StrictAstNode } from '../slang-nodes/types.d.ts';
import type { Location, SlangAstNode } from '../types.d.ts';

const offsets = new Map<number, number>();
const childNodes = new Map<number, Edge[]>();
export function clearOffsets(): void {
  offsets.clear();
  childNodes.clear();
}

function getChildren(node: Node): Edge[] {
  const id = node.id;
  if (childNodes.has(id)) {
    return childNodes.get(id)!;
  }
  const children = node.children();
  childNodes.set(id, children);
  return children;
}

function reversedIterator<T>(children: T[]): Iterable<T> {
  return {
    [Symbol.iterator](): Iterator<T> {
      let index = children.length;
      return {
        next: function (): IteratorResult<T, T> {
          index--;
          return { done: index < 0, value: children[index] };
        }
      };
    }
  };
}

function isNonTriviaNode(node: Node): boolean {
  return (
    node.isNonterminalNode() || !TerminalKindExtensions.isTrivia(node.kind)
  );
}

function getOffset(parent: Node, children: Edge[], isLeading = true): number {
  if (
    parent.kind !== NonterminalKind.IdentifierPath &&
    isNodeCollection(parent)
  ) {
    return 0;
  }

  let offset = 0;
  for (const { node } of isLeading ? children : reversedIterator(children)) {
    if (node.isNonterminalNode()) {
      // When we find the first non-terminal token, we continue looking for the
      // offset within the this token.
      if (offset > 0) break;
      return getOffset(node, getChildren(node), isLeading);
    }
    if (!TerminalKindExtensions.isTrivia(node.kind)) {
      // The node's content starts when we find the first non-comment,
      // non-whitespace token.
      break;
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

  loc: Location;

  constructor(ast: SlangAstNode | TerminalNode) {
    if (ast instanceof TerminalNode) {
      const offset = offsets.get(ast.id) || 0;
      this.loc = {
        start: offset,
        end: offset + ast.textLength.utf16
      };
      return;
    }
    const parent = ast.cst;
    const children = getChildren(parent);

    const initialOffset = offsets.get(parent.id) || 0;
    let offset = initialOffset;

    for (const { node } of children) {
      if (isNonTriviaNode(node)) {
        // Also tracking TerminalNodes since some variants that were not
        // Identifier or YulIdentifier but were upgraded to TerminalNode
        offsets.set(node.id, offset);
      } else {
        switch (node.kind) {
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
        }
      }

      offset += node.textLength.utf16;
    }

    const leadingOffset = getOffset(parent, children);
    const trailingOffset = getOffset(parent, children, false);

    this.loc = {
      start: initialOffset + leadingOffset,
      end: offset - trailingOffset
    };
  }

  updateMetadata(
    ...childNodes: (StrictAstNode | StrictAstNode[] | undefined)[]
  ): void {
    // Collect comments
    this.comments = childNodes.reduce(collectComments, this.comments);
  }
}
