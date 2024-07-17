import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';
import { Expression } from './Expression.js';

export class ArrayTypeName extends SlangNode {
  operand;

  openBracket;

  index;

  closeBracket;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { operand, openBracket, index, closeBracket } = ast;
      this.operand = new TypeName(
        operand,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.openBracket = openBracket.text;
      if (index) {
        this.index = new Expression(
          index,
          childrenOffsets.shift(),
          comments,
          options
        );
      }
      this.closeBracket = closeBracket.text;
    };

    this.initialize(ast, offset, comments, fetch);
  }

  print(path, print) {
    return [
      path.call(print, 'operand'),
      this.openBracket,
      this.index ? path.call(print, 'index') : '',
      this.closeBracket
    ];
  }
}
