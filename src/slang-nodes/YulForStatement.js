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

    const fetch = (offsets) => ({
      forKeyword: ast.forKeyword.text,
      initialization: new YulBlock(ast.initialization, offsets[0], options),
      condition: new YulExpression(ast.condition, offsets[1], options),
      iterator: new YulBlock(ast.iterator, offsets[2], options),
      body: new YulBlock(ast.body, offsets[3], options)
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
