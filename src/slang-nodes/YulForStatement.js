import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { YulBlock } from './YulBlock.js';
import { YulExpression } from './YulExpression.js';

export class YulForStatement extends SlangNode {
  get kind() {
    return NonterminalKind.YulForStatement;
  }

  forKeyword;

  initialization;

  condition;

  iterator;

  body;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      forKeyword: ast.forKeyword.text,
      initialization: new YulBlock(
        ast.initialization,
        childrenOffsets.shift(),
        options
      ),
      condition: new YulExpression(
        ast.condition,
        childrenOffsets.shift(),
        options
      ),
      iterator: new YulBlock(ast.iterator, childrenOffsets.shift(), options),
      body: new YulBlock(ast.body, childrenOffsets.shift(), options)
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      `${this.forKeyword} `,
      path.call(print, 'initialization'),
      ' ',
      path.call(print, 'condition'),
      ' ',
      path.call(print, 'iterator'),
      ' ',
      path.call(print, 'body')
    ];
  }
}
