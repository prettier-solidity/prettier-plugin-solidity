import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { join } = doc.builders;

export class VersionExpressionSet extends SlangNode {
  items;

  constructor({ ast, parse, offset, options }) {
    super(ast, offset);
    this.items = ast.items.map((item) =>
      parse(item, parse, this.nextChildOffset)
    );
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return join(' ', path.map(print, 'items'));
  }
}
