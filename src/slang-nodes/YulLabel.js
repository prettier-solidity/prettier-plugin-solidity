import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { dedent, line } = doc.builders;
export class YulLabel extends SlangNode {
  label;

  colon;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.label = ast.label.text;
    this.colon = ast.colon.text;
    this.initiateLoc(ast);
  }

  print() {
    return [dedent(line), `${this.label}${this.colon}`];
  }
}
