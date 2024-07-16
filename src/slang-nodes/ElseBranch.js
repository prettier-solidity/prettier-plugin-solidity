import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';

const { group, indent, line } = doc.builders;

const isIfStatementOrBlock = createKindCheckFunction(['Block', 'IfStatement']);

export class ElseBranch extends SlangNode {
  elseKeyword;

  body;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
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
