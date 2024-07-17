import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

export class IndexAccessEnd extends SlangNode {
  colon;

  end;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { colon, end } = ast;
      this.colon = colon.text;
      if (end) {
        this.end = new Expression(
          end,
          childrenOffsets.shift(),
          comments,
          options
        );
      }
    };

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [this.colon, this.end ? path.call(print, 'end') : ''];
  }
}
