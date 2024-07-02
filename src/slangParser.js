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
      // TODO: avoid collecting comments as a side effect of the functionality
      // for retrieving offsets
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
  const leadingOffset = getLeadingOffset(children);
  const trailingOffset = getTrailingOffset(children);

  const node = parsers[ast.cst.kind].parse({
    offsets,
    ast,
    options,
    parse: parseFunction
  });

  node.kind = ast.cst.kind;
  node.loc = {
    // We ignore the leading trivia and assume the node starts after it
    start: offset + leadingOffset,
    end: offset + ast.cst.textLength.utf8 - trailingOffset
  };

  if (node.kind === 'SourceUnit') {
    node.comments = comments.splice(0);
  }

  return node;
}

function parse(text, _parsers, options = _parsers) {
  const compiler = coerce(options.compiler);

  const language = new Language(compiler?.version || '0.8.25');
  const parsed = new SourceUnit(
    language.parse(NonterminalKind.SourceUnit, text).tree()
  );

  return genericParse(parsed, options, genericParse);
}

export default parse;
