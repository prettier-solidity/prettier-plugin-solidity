// https://prettier.io/docs/en/plugins.html#parsers
// import parser from '@solidity-parser/parser';
import { Language } from '@nomicfoundation/slang/language/index.js';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SourceUnit } from '@nomicfoundation/slang/ast/index.js';
import coerce from 'semver/functions/coerce.js';
import * as parsers from './slang-nodes/index.js';
import { isComment } from './common/slang-helpers.js';

const comments = [];
const getOffsets = (children, initialOffset) => {
  let offset = initialOffset;

  const offsets = children.reduce((offsetsArray, child) => {
    if (child.type === 'Nonterminal') {
      offsetsArray.push(offset);
    }
    if (child.type === 'Terminal' && isComment(child)) {
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
  return offsets;
};

const getLeadingOffset = (children) => {
  let offset = 0;
  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    if (child.type === 'Nonterminal') {
      // The node's content starts when we find the first non-terminal,
      // non-comment, non-whitespace token.
      return offset;
    }
    if (
      child.type === 'Terminal' &&
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
};
const getTrailingOffset = (children) => getLeadingOffset(children.reverse());

function genericParse(ast, options, parseFunction, parentOffsets = [0]) {
  const offset = parentOffsets.shift();
  const children = ast.cst.children();
  const offsets = getOffsets(children, offset);

  const node = parsers[ast.cst.kind].parse({
    offsets,
    ast,
    options,
    parse: parseFunction
  });

  /**
   * Leading and trailing Comments are considered by the parser as part of the
   * innermost possible node. For example if there is a comment just before a
   * variable assignment, the parser will consider the comment belongs to the
   * variable name instead of the whole statement.
   *
   * This behaviour creates erratic outcomes when the new line of a
   * SingleLineComment can trigger a group break or a prettier-ignore will
   * apply to a subset of the intended nodes.
   *
   * ```Solidity
   * // prettier-ignore
   * matrix = [
   *   0, 1, 2,
   *   3, 4, 5,
   *   6, 7, 8
   * ];
   * ```
   */
  let leadingOffset = getLeadingOffset(children);
  let trailingOffset = getTrailingOffset(children);
  const startWithTrivia = offset;
  const endWithTrivia = offset + ast.cst.textLength.utf8;

  if (leadingOffset === 0 || trailingOffset === 0) {
    const childrenKeys = Object.keys(node);

    for (let i = 0; i < childrenKeys.length; i += 1) {
      const childLoc = node[childrenKeys[i]]?.loc;

      if (childLoc) {
        if (
          leadingOffset === 0 &&
          childLoc.startWithTrivia === startWithTrivia
        ) {
          leadingOffset = childLoc.start - startWithTrivia;
        }

        if (trailingOffset === 0 && childLoc.endWithTrivia === endWithTrivia) {
          trailingOffset = endWithTrivia - childLoc.end;
        }
      }
    }
  }

  node.kind = ast.cst.kind;
  node.loc = {
    startWithTrivia,
    start: startWithTrivia + leadingOffset,
    endWithTrivia,
    end: endWithTrivia - trailingOffset
  };

  return node;
}

function parse(text, _parsers, options = _parsers) {
  const compiler = coerce(options.compiler);

  const language = new Language(compiler?.version || '0.8.25');
  const ast = new SourceUnit(
    language.parse(NonterminalKind.SourceUnit, text).tree()
  );

  const parsed = genericParse(ast, options, genericParse);
  parsed.comments = comments.splice(0);
  return parsed;
}

export default parse;
