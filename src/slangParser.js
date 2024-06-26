// https://prettier.io/docs/en/plugins.html#parsers
// import parser from '@solidity-parser/parser';
import { Language } from '@nomicfoundation/slang/language/index.js';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SourceUnit } from '@nomicfoundation/slang/ast/index.js';
import coerce from 'semver/functions/coerce.js';
import * as parsers from './slang-nodes/index.js';
import { isComment } from './common/slang-helpers.js';

const comments = [];
const getOffsets = (ast, nodeOffset) => {
  let offset = nodeOffset;

  return ast.cst.children().reduce((offsetsArray, child) => {
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
};

function genericParse(ast, options, parseFunction, parentOffsets = [0]) {
  const offset = parentOffsets.shift();
  const offsets = getOffsets(ast, offset);

  const node = parsers[ast.cst.kind].parse({
    offsets,
    ast,
    options,
    parse: parseFunction
  });

  node.kind = ast.cst.kind;
  node.loc = {
    start: offset,
    end: offset + ast.cst.textLength.utf8
  };

  if (node.kind === 'SourceUnit') node.comments = comments;

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
