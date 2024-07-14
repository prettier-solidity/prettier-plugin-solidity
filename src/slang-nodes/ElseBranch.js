import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { createKindCheckFunction } from '../common/slang-helpers.js';

const { group, indent, line } = doc.builders;

const isIfStatementOrBlock = createKindCheckFunction(['Block', 'IfStatement']);
export class ElseBranch extends SlangNode {
  elseKeyword;

  body;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
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
