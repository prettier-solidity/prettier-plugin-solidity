import { SlangNode } from './SlangNode.js';

export class IndexAccessEnd extends SlangNode {
  colon;

  end;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return [this.colon, this.end ? path.call(print, 'end') : ''];
  }
}
