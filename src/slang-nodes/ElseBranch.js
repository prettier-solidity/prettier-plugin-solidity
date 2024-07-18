import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';
import { SlangNode } from './SlangNode.js';
import { Statement } from './Statement.js';

const { group, indent, line } = doc.builders;

const isIfStatementOrBlock = createKindCheckFunction(['Block', 'IfStatement']);

export class ElseBranch extends SlangNode {
  get kind() {
    return NonterminalKind.ElseBranch;
  }

  elseKeyword;

  body;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      elseKeyword: ast.elseKeyword.text,
      body: new Statement(ast.body, childrenOffsets.shift(), options)
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      this.elseKeyword,
      isIfStatementOrBlock(this.body.variant)
        ? [' ', path.call(print, 'body')]
        : group(indent([line, path.call(print, 'body')]))
    ];
  }
}
