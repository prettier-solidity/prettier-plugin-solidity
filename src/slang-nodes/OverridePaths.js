import { SlangNode } from './SlangNode.js';

export class OverridePaths extends SlangNode {
  items;

  separators;

  constructor({ ast, parse, offset, options }) {
    super(ast, offset);
    this.items = ast.items.map((item) =>
      parse(item, parse, this.nextChildOffset)
    );
    this.separators = ast.separators.map((separator) => separator);
    this.initiateLoc(ast);
  }

  // TODO: implement print
  print({ path, print, options }) {
    return ['TODO: OverridePaths'];
  }
}
