import { TerminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { NodeType } from '@nomicfoundation/slang/cst/index.js';
import { isComment } from './is-comment.js';

import type { Node } from '@nomicfoundation/slang/cst';
import type { AstNode, Comment, Metadata, SlangAstNode } from '../types';

function getLeadingOffset(children: Node[]): number {
  let offset = 0;
  for (const child of children) {
    if (child.type === NodeType.Nonterminal) {
      // The node's content starts when we find the first non-terminal token.
      return offset;
    } else if (
      !isComment(child) &&
      child.kind !== TerminalKind.EndOfLine &&
      child.kind !== TerminalKind.Whitespace
    ) {
      // The content of the node started if we find a non-comment,
      // non-whitespace token.
      return offset;
    }
    offset += child.textLength.utf8;
  }
  return offset;
}

export function getNodeMetadata(
  ast: SlangAstNode,
  initialOffset: number
): Metadata {
  const children = ast.cst.children();

  let offset = initialOffset;

  const comments: Comment[] = [];

  const offsets = children.reduce((offsetsArray: number[], child) => {
    if (child.type === NodeType.Nonterminal) {
      offsetsArray.push(offset);
    } else if (
      child.kind === TerminalKind.MultiLineComment ||
      child.kind === TerminalKind.MultiLineNatSpecComment ||
      child.kind === TerminalKind.SingleLineComment ||
      child.kind === TerminalKind.SingleLineNatSpecComment
    ) {
      // Since the fetching the comments and calculating offsets are both done
      // as we iterate over the children and the comment also depends on the
      // offset, it's hard to separate these responsibilities into different
      // functions.
      comments.push({
        kind: child.kind,
        value: child.text,
        loc: {
          start: offset,
          end: offset + child.textLength.utf8
        }
      });
    }

    offset += child.textLength.utf8;
    return offsetsArray;
  }, []);

  const leadingOffset = getLeadingOffset(children);
  const trailingOffset = getLeadingOffset(children.reverse());
  const loc = {
    start: initialOffset + leadingOffset,
    end: initialOffset + ast.cst.textLength.utf8 - trailingOffset,
    leadingOffset,
    trailingOffset
  };

  return { comments, loc, offsets };
}

function collectComments(
  comments: Comment[],
  node: AstNode | AstNode[] | undefined
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
  childNodes: (AstNode | AstNode[] | undefined)[]
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

  return { comments, loc, offsets: [] };
}
