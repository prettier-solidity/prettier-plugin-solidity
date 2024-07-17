import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

export class IndexAccessEnd extends SlangNode {
  colon;

  end;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { colon, end } = ast;
      this.colon = colon.text;
      if (end) {
        this.end = new Expression(
          end,
          childrenOffsets.shift(),
          comments,
          parse,
          options
        );
      }
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    return [this.colon, this.end ? path.call(print, 'end') : ''];
  }
}
