import { SlangNode } from './SlangNode.js';

export class IndexAccessEnd extends SlangNode {
  colon;

  end;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.colon = ast.colon.text;
    this.end = ast.end
      ? parse(ast.end, parse, this.nextChildOffset)
      : undefined;
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [this.colon, this.end ? path.call(print, 'end') : ''];
  }
}
