import { doc } from 'prettier';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';
import { SlangNode } from './SlangNode.js';
import { Statement } from './Statement.js';

const { group, indent, line } = doc.builders;

const isIfStatementOrBlock = createKindCheckFunction(['Block', 'IfStatement']);

export class ElseBranch extends SlangNode {
  elseKeyword;

  body;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { elseKeyword, body } = ast;
      this.elseKeyword = elseKeyword.text;
      this.body = new Statement(
        body,
        childrenOffsets.shift(),
        comments,
        options
      );
    };

    this.initialize(ast, offset, fetch, comments);
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
