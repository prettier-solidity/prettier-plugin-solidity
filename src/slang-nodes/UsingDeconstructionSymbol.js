import { SlangNode } from './SlangNode.js';

export class UsingDeconstructionSymbol extends SlangNode {
  name;

  alias;

  constructor({ ast, parse, offset, options }) {
    super(ast, offset);
    this.name = parse(ast.name, parse, this.nextChildOffset);
    this.alias = ast.alias
      ? parse(ast.alias, parse, this.nextChildOffset)
      : undefined;
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [
      path.call(print, 'name'),
      this.alias ? path.call(print, 'alias') : ''
    ];
  }
}
