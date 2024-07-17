import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

export class IndexAccessEnd extends SlangNode {
  colon;

  end;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      colon: ast.colon.text,
      end: ast.end
        ? new Expression(ast.end, childrenOffsets.shift(), comments, options)
        : undefined
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [this.colon, this.end ? path.call(print, 'end') : ''];
  }
}
