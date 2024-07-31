import { isComment } from './is-comment.js';

import type { Node } from '@nomicfoundation/slang/cst/index.js';
import type { AstNode, Comment, Metadata, SlangAstNode } from '../types.js';

function getLeadingOffset(children: Node[]): number {
  let offset = 0;
  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    if (child.type === 'Nonterminal') {
      // The node's content starts when we find the first non-terminal token.
      return offset;
    } else if (
      !isComment(child) &&
      child.kind !== 'EndOfLine' &&
      child.kind !== 'Whitespace'
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
    if (child.type === 'Nonterminal') {
      offsetsArray.push(offset);
    } else if (
      child.kind === 'MultiLineComment' ||
      child.kind === 'MultiLineNatSpecComment' ||
      child.kind === 'SingleLineComment' ||
      child.kind === 'SingleLineNatSpecComment'
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
      comments.push(...node.reduce(collectComments, []));
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
  const { comments, loc } = metadata;
  // Collect comments
  comments.push(...childNodes.reduce(collectComments, []));

  // calculate correct loc object
  if (loc.leadingOffset === 0 || loc.trailingOffset === 0) {
    childNodes.forEach((childNode) => {
      if (Array.isArray(childNode)) return;
      const childLoc = childNode?.loc;

      if (childLoc) {
        if (
          loc.leadingOffset === 0 &&
          childLoc.start - childLoc.leadingOffset === loc.start
        ) {
          loc.leadingOffset = childLoc.leadingOffset;
          loc.start += childLoc.leadingOffset;
        }

        if (
          loc.trailingOffset === 0 &&
          childLoc.end + childLoc.trailingOffset === loc.end
        ) {
          loc.trailingOffset = childLoc.trailingOffset;
          loc.end -= childLoc.trailingOffset;
        }
      }
    });
  }
  return { comments, loc, offsets: [] };
}
