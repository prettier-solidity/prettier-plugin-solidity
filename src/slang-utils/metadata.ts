import { TerminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { NodeType, TerminalNode } from '@nomicfoundation/slang/cst/index.js';
import { createKindCheckFunction } from './create-kind-check-function.js';
import { MultiLineComment } from '../slang-nodes/MultiLineComment.js';
import { MultiLineNatSpecComment } from '../slang-nodes/MultiLineNatSpecComment.js';
import { SingleLineComment } from '../slang-nodes/SingleLineComment.js';
import { SingleLineNatSpecComment } from '../slang-nodes/SingleLineNatSpecComment.js';

import type { Node } from '@nomicfoundation/slang/cst';
import type { Comment, StrictAstNode } from '../slang-nodes';
import type { Metadata, SlangAstNode } from '../types';

const isCommentOrWhiteSpace = createKindCheckFunction([
  TerminalKind.MultiLineComment,
  TerminalKind.MultiLineNatSpecComment,
  TerminalKind.SingleLineComment,
  TerminalKind.SingleLineNatSpecComment,
  TerminalKind.EndOfLine,
  TerminalKind.Whitespace
]);

const offsets = new Map<Node, number>();

export function clearOffsets(): void {
  offsets.clear();
}

function getLeadingOffset(children: Node[]): number {
  let offset = 0;
  for (const child of children) {
    if (child.type === NodeType.Nonterminal) {
      // The node's content starts when we find the first non-terminal token.
      return offset;
    } else if (!isCommentOrWhiteSpace(child)) {
      // The content of the node started if we find a non-comment,
      // non-whitespace token.
      return offset;
    }
    offset += child.textLength.utf16;
  }
  return offset;
}

export function getNodeMetadata(
  ast: SlangAstNode | TerminalNode,
  enclosePeripheralComments = false
): Metadata {
  if (ast instanceof TerminalNode) {
    const offset = offsets.get(ast) || 0;

    return {
      comments: [],
      loc: {
        start: offset,
        end: offset + ast.textLength.utf16,
        leadingOffset: 0,
        trailingOffset: 0
      }
    };
  }

  const children = ast.cst.children();

  const initialOffset = offsets.get(ast.cst) || 0;
  let offset = initialOffset;

  const comments = children.reduce((commentsArray: Comment[], child) => {
    if (child.type === NodeType.Nonterminal) {
      offsets.set(child, offset);
    } else {
      switch (child.kind) {
        // Since the fetching the comments and calculating offsets are both done
        // as we iterate over the children and the comment also depends on the
        // offset, it's hard to separate these responsibilities into different
        // functions without doing the iteration twice.
        case TerminalKind.MultiLineComment:
          commentsArray.push(new MultiLineComment(child, offset));
          break;
        case TerminalKind.MultiLineNatSpecComment:
          commentsArray.push(new MultiLineNatSpecComment(child, offset));
          break;
        case TerminalKind.SingleLineComment:
          commentsArray.push(new SingleLineComment(child, offset));
          break;
        case TerminalKind.SingleLineNatSpecComment:
          commentsArray.push(new SingleLineNatSpecComment(child, offset));
          break;
        case TerminalKind.Identifier:
        case TerminalKind.YulIdentifier:
          // Identifiers usually are user provided names for variables,
          // functions, etc...
          // Since a user can add comments to this section of the code as well,
          // we need to track the offsets.
          offsets.set(child, offset);
          break;
      }
    }

    offset += child.textLength.utf16;
    return commentsArray;
  }, []);

  const leadingOffset = enclosePeripheralComments
    ? 0
    : getLeadingOffset(children);
  const trailingOffset = enclosePeripheralComments
    ? 0
    : getLeadingOffset(children.reverse());
  const loc = {
    start: initialOffset + leadingOffset,
    end: initialOffset + ast.cst.textLength.utf16 - trailingOffset,
    leadingOffset,
    trailingOffset
  };

  return { comments, loc };
}

function collectComments(
  comments: Comment[],
  node: StrictAstNode | StrictAstNode[] | undefined
): Comment[] {
  if (node) {
    if (Array.isArray(node)) {
      return node.reduce(collectComments, comments);
    } else if (node.comments.length > 0) {
      comments.push(...node.comments.splice(0));
    }
  }
  return comments;
}

export function updateMetadata(
  metadata: Metadata,
  childNodes: (StrictAstNode | StrictAstNode[] | undefined)[]
): Metadata {
  // Collect comments
  const comments = childNodes.reduce(collectComments, metadata.comments);

  // calculate correct loc object
  const { loc } = metadata;
  if (loc.leadingOffset === 0) {
    for (const childNode of childNodes) {
      if (typeof childNode === 'undefined' || Array.isArray(childNode))
        continue;
      const childLoc = childNode.loc;

      if (childLoc.start - childLoc.leadingOffset === loc.start) {
        loc.leadingOffset = childLoc.leadingOffset;
        loc.start += childLoc.leadingOffset;
        break;
      }
    }
  }

  if (loc.trailingOffset === 0) {
    for (const childNode of childNodes.reverse()) {
      if (typeof childNode === 'undefined' || Array.isArray(childNode))
        continue;
      const childLoc = childNode.loc;

      if (childLoc.end + childLoc.trailingOffset === loc.end) {
        loc.trailingOffset = childLoc.trailingOffset;
        loc.end -= childLoc.trailingOffset;
        break;
      }
    }
  }

  return { comments, loc };
}
