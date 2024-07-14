import { SlangNode } from './SlangNode.js';

export class IndexAccessEnd extends SlangNode {
  colon;

  end;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [this.colon, this.end ? path.call(print, 'end') : ''];
  }
}
