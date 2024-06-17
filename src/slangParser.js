// https://prettier.io/docs/en/plugins.html#parsers
// import parser from '@solidity-parser/parser';
import { Language } from '@nomicfoundation/slang/language/index.js';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SourceUnit } from '@nomicfoundation/slang/ast/index.js';
import coerce from 'semver/functions/coerce.js';
import * as parsers from './slang-nodes/index.js';

const commentKinds = [
  'MultiLineComment',
  'MultiLineNatSpecComment',
  'SingleLineComment',
  'SingleLineNatSpecComment'
];

const getCommentsAndOffsets = (ast, nodeOffset) => {
  const children = ast.cst.children();
  let offset = nodeOffset;
  return children.reduce(
    (commentsAndOffsets, child) => {
      if (child.type === 'Nonterminal') {
        commentsAndOffsets.offsets.push(offset);
      }
      if (child.type === 'Terminal' && commentKinds.includes(child.kind)) {
        commentsAndOffsets.comments.push({
          value: child.text,
          loc: {
            start: offset,
            end: offset + child.textLength.utf8 - 1
          }
        });
      }
      offset += child.textLength.utf8;
      return commentsAndOffsets;
    },
    { comments: [], offsets: [] }
  );
};

function genericParse(ast, options, parseFunction, parentOffsets = [0]) {
  const offset = parentOffsets.shift();
  const { comments, offsets } = getCommentsAndOffsets(ast, offset);
  // console.log(comments);
  // console.log(offsets);

  let node = {
    kind: ast.cst.kind,
    loc: {
      start: offset,
      end: offset + ast.cst.textLength.utf8 - 1
    }
    // comments
  };

  node = parsers[ast.cst.kind].parse({
    node,
    offsets,
    ast,
    options,
    parse: parseFunction
  });

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
