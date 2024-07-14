import { SlangNode } from './SlangNode.js';

export class IndexAccessEnd extends SlangNode {
  colon;

  end;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.colon = ast.colon.text;
    if (ast.end) {
      this.end = parse(ast.end, this.nextChildOffset);
    }
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [this.colon, this.end ? path.call(print, 'end') : ''];
  }
}
